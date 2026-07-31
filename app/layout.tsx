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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jrfinserv.com";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${company.name} · Trusted Financial Advisory in Tamil Nadu`,
		template: `%s | ${company.name}`,
	},
	description: `${company.name} is a trusted local financial advisory helping families across Tamil Nadu with Mutual Funds, LIC, Health, and General Insurance.`,
	keywords: [
		"mutual funds",
		"LIC agent",
		"health insurance",
		"general insurance",
		"financial advisor Tamil Nadu",
		"Komarapalayam financial advisor",
		"Star Health agent",
	],
	authors: [{ name: company.name }],
	creator: company.name,
	publisher: company.name,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	alternates: {
		canonical: "./",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: siteUrl,
		siteName: company.name,
		title: `${company.name} · Trusted Financial Advisory in Tamil Nadu`,
		description: `${company.name} is a trusted local financial advisory helping families across Tamil Nadu with Mutual Funds, LIC, Health, and General Insurance.`,
		images: [
			{
				url: `${siteUrl}/images/hero/hero-family.webp`,
				width: 1200,
				height: 630,
				alt: `${company.name} Financial Advisory`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${company.name} · Trusted Financial Advisory`,
		description: `${company.name} is a trusted local financial advisory helping families across Tamil Nadu.`,
		images: [`${siteUrl}/images/hero/hero-family.webp`],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "FinancialService",
	name: company.name,
	image: `${siteUrl}/images/logo/logo.webp`,
	telephone: company.phone.value,
	email: company.email.display,
	address: {
		"@type": "PostalAddress",
		streetAddress: "MK Samy Complex, New Pallipalayam Road",
		addressLocality: "Komarapalayam",
		addressRegion: "Tamil Nadu",
		postalCode: "638183",
		addressCountry: "IN",
	},
	url: siteUrl,
	priceRange: "$$",
	openingHours: "Mo-Sa 09:30-19:30",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="bg-neutral-50 text-foreground">
				{children}
			</body>
		</html>
	);
}