import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

// Interface pura para o router
export interface AppRouter {
	healthCheck: {
		input: never;
		output: string;
	};
	privateData: {
		input: never;
		output: {
			message: string;
			user: {
				id: string;
				email: string;
				name?: string | null;
			};
		};
	};
}

// Tipos úteis para o cliente
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
