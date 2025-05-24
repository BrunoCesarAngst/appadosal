import type { RouterOutputs } from "@appadosal/types";
import { protectedProcedure, publicProcedure, router } from "./lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK" as RouterOutputs["healthCheck"];
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		} as RouterOutputs["privateData"];
	}),
});

export type AppRouter = typeof appRouter;
