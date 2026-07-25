"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Partner {
	name: string;
	src?: string;
	logo_url?: string;
	type?: string;
	website_url?: string | null;
}

interface PartnerLogosProps {
	/** Section eyebrow text shown above the logos */
	title?: string;
	partners: Partner[];
	/**
	 * "grid" — multiple partner wordmarks (e.g. AMC partners for Mutual Funds).
	 * "single" — one large, prominent trust badge (e.g. LIC, Star Health).
	 */
	variant?: "grid" | "single";
	className?: string;
}

const PARTNER_LOGO_MAP: Record<string, string> = {
	"Nippon India Mutual Fund": "/images/partner-logos/nippon.jpg",
	"SBI Mutual Fund": "/images/partner-logos/sbi.jpg",
	"ICICI Prudential Mutual Fund": "/images/partner-logos/icici.jpg",
	"Mahindra Manulife Mutual Fund": "/images/partner-logos/mahindra.png",
	"Motilal Oswal Mutual Fund": "/images/partner-logos/motilal.jpg",
	"Aditya Birla Sun Life Mutual Fund": "/images/partner-logos/abs.jpg",
	"LIC": "/images/partner-logos/lic.png",
	"Star Health Insurance": "/images/partner-logos/star-health.jpg",
	"Chola MS General Insurance": "/images/partner-logos/chola.jpg",
	"National Insurance": "/images/partner-logos/national.jpg",
};

export function PartnerLogos({ title, partners, variant = "grid", className }: PartnerLogosProps) {
	if (variant === "single" && partners.length > 0) {
		const partner = partners[0];
		const logoSrc = partner.logo_url || partner.src || PARTNER_LOGO_MAP[partner.name];
		const imageElement = logoSrc ? (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={logoSrc}
				alt={partner.name}
				className="h-16 md:h-20 w-auto object-contain rounded-xl shadow-xs"
			/>
		) : (
			<span className="font-display font-bold text-3xl md:text-4xl text-navy-900 tracking-tight">
				{partner.name}
			</span>
		);

		return (
			<div className={cn("w-full py-14 md:py-16 bg-white border-y border-neutral-100", className)}>
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
					{title && (
						<p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
							{title}
						</p>
					)}
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="flex flex-col items-center gap-4 px-12 py-8 rounded-3xl border border-neutral-200/80 bg-neutral-50/60 shadow-[0_8px_24px_rgba(10,27,51,0.04)]"
					>
						{partner.website_url ? (
							<a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
								{imageElement}
							</a>
						) : (
							imageElement
						)}
						{partner.type && (
							<span className="text-xs font-medium text-neutral-500 uppercase tracking-wider mt-1">
								{partner.type}
							</span>
						)}
						<span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full">
							<ShieldCheck className="h-3.5 w-3.5" /> Authorised Partner
						</span>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<div className={cn("w-full py-14 md:py-16 bg-white border-y border-neutral-100", className)}>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
				{title && (
					<p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest text-center">
						{title}
					</p>
				)}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
					{partners.map((partner, index) => {
						const logoSrc = partner.logo_url || partner.src || PARTNER_LOGO_MAP[partner.name];
						const content = (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="flex items-center justify-center text-center p-5 min-h-[96px] rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:border-blue-500/30 hover:bg-white hover:shadow-[0_8px_20px_rgba(10,27,51,0.05)] transition-all duration-300 group"
							>
								{logoSrc ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={logoSrc}
										alt={partner.name}
										className="h-10 md:h-12 w-auto object-contain max-w-full"
									/>
								) : (
									<span className="font-display font-semibold text-sm md:text-base text-neutral-600 tracking-tight group-hover:text-blue-600">
										{partner.name}
									</span>
								)}
							</motion.div>
						);

						if (partner.website_url) {
							return (
								<a
									key={partner.name + index}
									href={partner.website_url}
									target="_blank"
									rel="noopener noreferrer"
									className="block"
								>
									{content}
								</a>
							);
						}

						return <div key={partner.name + index}>{content}</div>;
					})}
				</div>
			</div>
		</div>
	);
}
