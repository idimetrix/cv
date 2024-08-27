import { initTRPC } from "@trpc/server";
import { performance } from "node:perf_hooks";
import superjson from "superjson";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const maintenanceMiddleware = t.middleware(async ({ next }) => {
  return next();
});

const performanceMiddleware = t.middleware(async ({ path, type, ctx, rawInput, next }) => {
  const startTime = performance.now();

  const result = await next({ ctx });

  const endTime = performance.now();

  const name = `[${result.ok ? "SUCCESS" : "ERROR"}] ${type.toUpperCase()} '${path}'`;

  const duration = endTime - startTime;

  if (result.ok)
    console.log(name, `${duration.toFixed(2)} ms / ${(duration / 1000).toFixed(4)} s`, rawInput, undefined);
  else
    console.error(
      name,
      `${duration.toFixed(2)} ms / ${(duration / 1000).toFixed(4)} s`,
      rawInput,
      result.error?.message
    );

  return result;
});

export const router = t.router;

export const publicProcedure = t.procedure.use(maintenanceMiddleware).use(performanceMiddleware);
