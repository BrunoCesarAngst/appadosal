import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";

const isProduction = process.env.NODE_ENV === "production";
const domain = isProduction ? ".appadosal-web.vercel.app" : undefined;

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",

		schema: schema,
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: isProduction,
			domain: domain,
		},
		defaultCookieAttributes: {
			secure: true,
			httpOnly: true,
			sameSite: "lax",
			partitioned: true,
		},
		useSecureCookies: true,
	},
});
