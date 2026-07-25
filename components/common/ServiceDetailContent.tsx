"use client";

import React from "react";
import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { PartnerLogos, type Partner } from "@/components/common/PartnerLogos";
import { YouTubeVideoSection } from "@/components/common/YouTubeVideoSection";
import { MutualFundCalculatorsSection } from "@/components/common/MutualFundCalculatorsSection";
import { ContactConsultationSection } from "@/components/common/ContactConsultationSection";
import { TrendingUp, ShieldCheck, HeartPulse, Home, Car, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/config/company";
import type { YouTubeVideo, Partner as CMSPartner } from "@/types/cms";

interface ServiceDetail {
	name: string;
	headline: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	iconBg: string;
	iconColor: string;
	whatWeOffer: string[];
	partnerSection?: {
		title: string;
		partners: Partner[];
		variant: "grid" | "single";
	};
}

const servicesData: Record<string, ServiceDetail> = {
	"mutual-funds": {
		name: "Mutual Funds Advisory",
		headline: "Grow Your Savings the Smart Way",
		description: "We help you choose mutual funds that match your goals and comfort with risk — explained in plain language, not jargon.",
		icon: TrendingUp,
		iconBg: "bg-emerald-50",
		iconColor: "text-emerald-600",
		whatWeOffer: [
			"Simple monthly SIP plans, or a one-time investment — whichever suits you",
			"A mix of safer and higher-growth funds based on your goals",
			"Regular, honest reviews of how your money is doing",
		],
		partnerSection: {
			title: "We Are Empanelled With Leading Asset Management Companies",
			variant: "grid",
			partners: [
				{ name: "Nippon India Mutual Fund" },
				{ name: "SBI Mutual Fund" },
				{ name: "Kotak Mutual Fund" },
				{ name: "ICICI Prudential Mutual Fund" },
				{ name: "Mahindra Manulife Mutual Fund" },
				{ name: "Motilal Oswal Mutual Fund" },
				{ name: "Aditya Birla Sun Life Mutual Fund" },
			],
		},
	},
	lic: {
		name: "LIC Life Insurance",
		headline: "Protect Your Family's Future",
		description: "Government-backed LIC life insurance plans that give your family financial security, whatever happens.",
		icon: ShieldCheck,
		iconBg: "bg-navy-100",
		iconColor: "text-navy-700",
		whatWeOffer: [
			"Term plans that give maximum protection at low cost",
			"Savings-linked plans that pay out a lump sum later",
			"Retirement pension plans for a steady monthly income",
		],
		partnerSection: {
			title: "Authorised LIC Advisory Partner",
			variant: "single",
			partners: [{ name: "LIC", type: "Life Insurance Corporation of India" }],
		},
	},
	"health-insurance": {
		name: "Star Health Insurance",
		headline: "Don't Let Medical Bills Drain Your Savings",
		description: "Comprehensive Star Health insurance with cashless treatment at major hospitals, for you and your family.",
		icon: HeartPulse,
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		whatWeOffer: [
			"Individual cover for a single person",
			"Family floater plans covering your whole household under one policy",
			"Top-up plans to boost an existing office health cover",
		],
		partnerSection: {
			title: "Authorised Star Health Advisory Partner",
			variant: "single",
			partners: [{ name: "Star Health Insurance", type: "Star Health & Allied Insurance" }],
		},
	},
	"general-insurance": {
		name: "General Insurance",
		headline: "Protect Your Property and Business",
		description: "Insurance cover for your shop, office, or business assets against fire, theft, and other unexpected events.",
		icon: Home,
		iconBg: "bg-amber-100/60",
		iconColor: "text-amber-600",
		whatWeOffer: [
			"Cover for shops, offices, and warehouses",
			"Group health cover for your employees",
			"Cover for goods in transit and shipments",
		],
		partnerSection: {
			title: "We Are Empanelled With",
			variant: "grid",
			partners: [
				{ name: "Chola MS General Insurance" },
				{ name: "National Insurance" },
			],
		},
	},
	"vehicle-insurance": {
		name: "Vehicle Insurance",
		headline: "Stress-Free Cover for Your Car or Bike",
		description: "Comprehensive or third-party vehicle insurance with easy, cashless claims when you need them most.",
		icon: Car,
		iconBg: "bg-blue-50",
		iconColor: "text-blue-600",
		whatWeOffer: [
			"Comprehensive cover for cars, including accidents and theft",
			"Two-wheeler policies with instant issuance",
			"Basic third-party cover if you just need the legal minimum",
		],
		partnerSection: {
			title: "We Are Empanelled With",
			variant: "grid",
			partners: [
				{ name: "Chola MS General Insurance" },
				{ name: "National Insurance" },
			],
		},
	},
};

interface ServiceDetailContentProps {
	slug: string;
	videos?: YouTubeVideo[];
	cmsPartners?: CMSPartner[];
}

export function ServiceDetailContent({
	slug,
	videos = [],
	cmsPartners = [],
}: ServiceDetailContentProps) {
	const service = servicesData[slug];
	if (!service) return null;

	const Icon = service.icon;
	const breadcrumbItems = [{ name: "Services", href: "/services" }, { name: service.name }];

	// Dynamic partner resolution from Supabase Partners CMS (LIC, Star Health, General, Mutual Funds, etc.)
	const categoryMatchingPartners = cmsPartners.filter((p) => {
		const cat = (p.category ?? "").toLowerCase();
		const pName = p.name.toLowerCase();
		if (slug === "mutual-funds") {
			return cat.includes("mutual") || cat.includes("amc") || pName.includes("mutual") || pName.includes("fund") || pName.includes("sbi") || pName.includes("nippon") || pName.includes("icici");
		}
		if (slug === "lic") {
			return cat.includes("life") || cat.includes("lic") || pName.includes("lic") || pName.includes("life insurance");
		}
		if (slug === "health-insurance") {
			return cat.includes("health") || cat.includes("star") || pName.includes("star health") || pName.includes("health");
		}
		if (slug === "general-insurance" || slug === "vehicle-insurance") {
			return cat.includes("general") || cat.includes("vehicle") || pName.includes("chola") || pName.includes("national") || pName.includes("insurance");
		}
		return false;
	});

	// Build active partner list dynamically from Supabase CMS
	const activePartnerList =
		categoryMatchingPartners.length > 0
			? categoryMatchingPartners.map((p) => ({
					name: p.name,
					src: p.logo_url,
					logo_url: p.logo_url,
					type: slug === "lic" ? "Life Insurance Corporation of India" : slug === "health-insurance" ? "Star Health & Allied Insurance" : (p.category ?? undefined),
					website_url: p.website_url,
			  }))
			: (service.partnerSection?.partners ?? []).map((staticP) => {
					// Fallback: Check if cmsPartners has an updated logo for this static partner name
					const cmsMatch = cmsPartners.find(
						(cp) =>
							cp.name.toLowerCase().trim() === staticP.name.toLowerCase().trim() ||
							cp.name.toLowerCase().includes(staticP.name.toLowerCase()) ||
							staticP.name.toLowerCase().includes(cp.name.toLowerCase())
					);
					if (cmsMatch) {
						return {
							...staticP,
							name: cmsMatch.name,
							src: cmsMatch.logo_url,
							logo_url: cmsMatch.logo_url,
							website_url: cmsMatch.website_url,
						};
					}
					return staticP;
			  });

	return (
		<div className="flex flex-col w-full">
			<PageBanner title={service.headline} description={service.description} breadcrumbItems={breadcrumbItems} />

			{/* What We Offer Section */}
			<section className="py-20 md:py-28 bg-white border-b border-neutral-100">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="flex flex-col gap-6 text-left"
					>
						<div className="flex items-center gap-4">
							<div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-xs ${service.iconBg} ${service.iconColor}`}>
								<Icon className="h-7 w-7" />
							</div>
							<div>
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">SERVICE OVERVIEW</span>
								<h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900">
									What We Offer in {service.name}
								</h2>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
							{service.whatWeOffer.map((item, idx) => (
								<Card key={idx} variant="resting" hoverEffect className="flex flex-col gap-3 p-6 border-neutral-200/80 bg-neutral-50/50">
									<div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
										<CheckCircle2 className="h-5 w-5" />
									</div>
									<span className="text-sm font-semibold text-navy-900 leading-relaxed font-body">{item}</span>
								</Card>
							))}
						</div>

						<Card variant="resting" className="mt-4 border-blue-100 bg-blue-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl">
							<div className="flex flex-col gap-1 text-left">
								<h4 className="font-display font-bold text-base text-navy-900">Need Personalized Assistance?</h4>
								<p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-body">
									Not sure which option fits your family best? Talk to our certified advisors free of charge.
								</p>
							</div>
							<Link href={company.phone.href} className="shrink-0">
								<Button variant="primary-gradient" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-6">
									<span>Call {company.phone.display}</span>
									<ArrowRight className="h-4 w-4" />
								</Button>
							</Link>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Mutual Fund Calculators (Only for Mutual Funds Service Page) */}
			{slug === "mutual-funds" && <MutualFundCalculatorsSection />}

			{/* Service Category YouTube Videos */}
			{videos && videos.length > 0 && (
				<YouTubeVideoSection
					videos={videos}
					badgeText={`${service.name} Videos`}
					sectionTitle={`Watch ${service.name} Explainer & Client Videos`}
					sectionSubtitle="Educational videos and real client experiences explaining our solutions."
					bgClassName="bg-neutral-50 border-b border-neutral-200"
				/>
			)}

			{/* Empanelled Partners Section */}
			{service.partnerSection && activePartnerList.length > 0 && (
				<PartnerLogos
					title={service.partnerSection.title}
					partners={activePartnerList}
					variant={service.partnerSection.variant}
				/>
			)}

			{/* Standardized Contact / Book Consultation Section (Identical to Homepage) */}
			<ContactConsultationSection
				eyebrow="BOOK A CONSULTATION"
				title={`Book a Free Consultation for ${service.name}`}
				description="Call us, WhatsApp us, or fill in your details below — our certified advisors will guide you step-by-step."
			/>
		</div>
	);
}
