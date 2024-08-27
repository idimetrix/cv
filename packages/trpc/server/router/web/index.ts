import { router } from "../../trpc";
import { formsRouter } from "./forms";

export const webRouter = router({
  forms: formsRouter,
});

export type WebRouter = typeof webRouter;
