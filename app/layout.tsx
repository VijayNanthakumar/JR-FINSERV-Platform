import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";

import { company } from "@/config/company";

const META_PIXEL_ID = "1007007022337827";

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
				<Script
					id="meta-pixel"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							!function(f,b,e,v,n,t,s)
							{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
							n.callMethod.apply(n,arguments):n.queue.push(arguments)};
							if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
							n.queue=[];t=b.createElement(e);t.async=!0;
							t.src=v;s=b.getElementsByTagName(e)[0];
							s.parentNode.insertBefore(t,s)}(window, document,'script',
							'https://connect.facebook.net/en_US/fbevents.js');
							fbq('init', '${META_PIXEL_ID}');
							fbq('track', 'PageView');
						`,
					}}
				/>
				<noscript>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
						alt=""
					/>
				</noscript>
			</body>
		</html>
	);
}