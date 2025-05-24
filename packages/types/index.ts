// Tipos do usuário
export interface User {
	id: string;
	email: string;
	name: string | null;
}

// Tipos da sessão
export interface Session {
	user: User;
}

// Tipos do router
export interface RouterInputs {
	healthCheck: undefined;
	privateData: undefined;
}

export interface RouterOutputs {
	healthCheck: string;
	privateData: {
		message: string;
		user: User;
	};
}

// Tipo do router
export type AppRouter = {
	privateData: {
		useQuery: () => {
			data: RouterOutputs["privateData"] | undefined;
			isLoading: boolean;
			error: Error | null;
		};
	};
	healthCheck: {
		useQuery: () => {
			data: RouterOutputs["healthCheck"] | undefined;
			isLoading: boolean;
			error: Error | null;
		};
	};
};
