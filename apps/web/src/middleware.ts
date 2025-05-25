import { authClient } from "@/lib/auth-client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await authClient.getSession();

	// Se o usuário estiver na página de login e já estiver autenticado
	if (request.nextUrl.pathname === "/login" && session) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Se o usuário tentar acessar o dashboard sem estar autenticado
	if (request.nextUrl.pathname === "/dashboard" && !session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/login"],
};
