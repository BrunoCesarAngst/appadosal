require("@testing-library/jest-dom");

// Mock do next/router
jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "",
			query: {},
			asPath: "",
			push: jest.fn(),
			replace: jest.fn(),
		};
	},
}));

// Mock do next/navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
		};
	},
	usePathname() {
		return "";
	},
}));

// Mock do next-themes
jest.mock("next-themes", () => ({
	useTheme: () => ({
		theme: "light",
		setTheme: jest.fn(),
	}),
}));
