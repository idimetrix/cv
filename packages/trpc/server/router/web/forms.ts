import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const formsRouter = router({
  contactUs: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return {};
    }),
});
