import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "@/styles/globals.css";

import { company } from "@/config/company";

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: {
		default: `${company.name} · Trusted Financial Advisory in Tamil Nadu`,
		template: `%s | ${company.name}`
	},
	description: `${company.name} is a trusted local financial advisory helping families across Tamil Nadu with Mutual Funds, LIC, Health, and General Insurance.`,
	keywords: ["mutual funds", "LIC agent", "health insurance", "general insurance", "financial advisor Tamil Nadu"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
			<body className="bg-neutral-50 text-foreground">
				{children}
			</body>
		</html>
	);
}