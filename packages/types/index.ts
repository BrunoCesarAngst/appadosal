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
	_def: {
		_config: {
			$types: {
				ctx: { session: Session | null };
				meta: Record<string, unknown>;
			};
			transformer: {
				input: {
					serialize: (data: unknown) => unknown;
					deserialize: (data: unknown) => unknown;
				};
				output: {
					serialize: (data: unknown) => unknown;
					deserialize: (data: unknown) => unknown;
				};
			};
			errorFormatter: unknown;
			allowOutsideOfServer: boolean;
			isServer: boolean;
			isDev: boolean;
		};
		router: true;
		procedures: {
			healthCheck: {
				input: RouterInputs["healthCheck"];
				output: RouterOutputs["healthCheck"];
			};
			privateData: {
				input: RouterInputs["privateData"];
				output: RouterOutputs["privateData"];
			};
		};
		record: unknown;
		lazy: Record<string, unknown>;
	};
	createCaller: () => {
		healthCheck: () => Promise<RouterOutputs["healthCheck"]>;
		privateData: () => Promise<RouterOutputs["privateData"]>;
	};
	healthCheck: {
		useQuery: () => {
			data: RouterOutputs["healthCheck"] | undefined;
			isLoading: boolean;
			error: Error | null;
		};
	};
	privateData: {
		useQuery: () => {
			data: RouterOutputs["privateData"] | undefined;
			isLoading: boolean;
			error: Error | null;
		};
	};
};
