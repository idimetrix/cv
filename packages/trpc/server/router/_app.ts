import { router } from "../trpc";
import { webRouter } from "./web";

export const appRouter = router({
  web: webRouter,
});

export type AppRouter = typeof appRouter;
