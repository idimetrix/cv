import { initTRPC } from "@trpc/server";
import { performance } from "node:perf_hooks";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create();

const maintenanceMiddleware = t.middleware(async ({ next }) => {
  return next();
});

const performanceMiddleware = t.middleware(async ({ path, type, ctx, next }) => {
  const startTime = performance.now();

  const result = await next({ ctx });

  const endTime = performance.now();

  const name = `[${result.ok ? "SUCCESS" : "ERROR"}] ${type.toUpperCase()} '${path}'`;

  const duration = endTime - startTime;

  if (result.ok) console.log(name, `${duration.toFixed(2)} ms / ${(duration / 1000).toFixed(4)} s`);
  else
    console.error(
      name,
      `${duration.toFixed(2)} ms / ${(duration / 1000).toFixed(4)} s`,
      result.error?.message
    );

  return result;
});

export const router = t.router;

export const publicProcedure = t.procedure.use(maintenanceMiddleware).use(performanceMiddleware);
