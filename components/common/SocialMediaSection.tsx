"use client";

import { ExternalLink } from "lucide-react";
import React from "react";

/* ─── Social card data ──────────────────────────────────────────────────── */
const socialCards = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/share/1aHhUWG8vK/",
		iconColor: "#1877F2",
		bg: "bg-[#e7f0fd]",
		border: "border-blue-100 hover:border-blue-300",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
				<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
			</svg>
		),
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/panaragasiyam?igsh=MW56M3d1dmhuMGNxYQ==",
		iconColor: "#E1306C",
		bg: "bg-[#fce4ec]",
		border: "border-pink-100 hover:border-pink-300",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
				<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
				<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
				<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
			</svg>
		),
	},
	{
		name: "YouTube",
		href: "https://youtube.com/@panaragasiyamjanardhanam?si=u_vCl5BSWiGAhB2E",
		iconColor: "#FF0000",
		bg: "bg-[#fdecea]",
		border: "border-red-100 hover:border-red-300",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
				<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
			</svg>
		),
	},
	{
		name: "WhatsApp",
		href: "https://wa.me/919842762637?text=SIP",
		iconColor: "#25D366",
		bg: "bg-[#e6f9ee]",
		border: "border-green-100 hover:border-green-300",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
				<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
				<path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.997l6.335-1.628A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.6-.498-5.112-1.371l-.363-.215-3.764.987.999-3.667-.236-.377A9.938 9.938 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
			</svg>
		),
	},
	{
		name: "WhatsApp Channel",
		href: "https://whatsapp.com/channel/0029VbDFWWu0rGiKlfSavU1T",
		iconColor: "#128C7E",
		bg: "bg-[#e0f5f2]",
		border: "border-teal-100 hover:border-teal-300",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
				<path d="M1 8.5C1 5.462 3.462 3 6.5 3h11C20.538 3 23 5.462 23 8.5v7c0 3.038-2.462 5.5-5.5 5.5H6.5C3.462 21 1 18.538 1 15.5v-7zM6.5 5C4.567 5 3 6.567 3 8.5v7C3 17.433 4.567 19 6.5 19h11c1.933 0 3.5-1.567 3.5-3.5v-7C21 6.567 19.433 5 17.5 5h-11zm1 3.75A.75.75 0 0 1 8.25 8h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 8.75zm0 3.25A.75.75 0 0 1 8.25 11.25h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 7.5 12z" />
			</svg>
		),
	},
] as const;

/* ─── Component ─────────────────────────────────────────────────────────── */
export function SocialMediaSection() {
	return (
		<section
			id="connect-with-us"
			className="py-12 sm:py-16 bg-white border-b border-neutral-200"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">

				{/* Heading */}
				<div className="flex flex-col items-center gap-2 text-center">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
						Follow Us
					</span>
					<h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900">
						Connect With Us
					</h2>
				</div>

				{/* Cards grid — 5-col desktop, 2-col mobile with 5th centered */}
				<div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-4xl">
					{socialCards.map((card) => (
						<a
							key={card.name}
							href={card.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Follow us on ${card.name}`}
							className={[
								// layout
								"flex flex-col items-center justify-center gap-3 p-5",
								// shape & border
								"rounded-2xl border shadow-xs",
								card.border,
								// bg
								"bg-white",
								// hover
								"hover:shadow-md hover:-translate-y-0.5",
								// transition
								"transition-all duration-200",
								// focus
								"focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
								// last card centered on mobile (2-col grid)
								"last:col-span-2 last:mx-auto last:w-1/2 lg:last:col-span-1 lg:last:w-full lg:last:mx-0",
							].join(" ")}
						>
							{/* Icon circle */}
							<div
								className={[
									"h-12 w-12 rounded-full flex items-center justify-center shrink-0",
									card.bg,
								].join(" ")}
							>
								<card.icon
									className="h-6 w-6"
									style={{ color: card.iconColor }}
								/>
							</div>

							{/* Label + external arrow */}
							<div className="flex items-center gap-1">
								<span className="text-xs font-semibold text-navy-900 text-center leading-tight">
									{card.name}
								</span>
								<ExternalLink
									className="h-3 w-3 text-neutral-400 shrink-0"
								/>
							</div>
						</a>
					))}
				</div>

			</div>
		</section>
	);
}
