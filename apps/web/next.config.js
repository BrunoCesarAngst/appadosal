/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ["@trpc/client", "@trpc/server", "@trpc/react-query"],
	experimental: {
		serverActions: true,
	},
	env: {
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
	},
};

module.exports = nextConfig;
