import Header from "@/components/header";
import Providers from "@/components/providers";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Appadosal",
	description: "Aplicação moderna com Next.js, tRPC e mais",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className="container mx-auto px-4 py-8">{children}</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
