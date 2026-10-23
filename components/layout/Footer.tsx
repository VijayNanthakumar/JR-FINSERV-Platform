"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesList } from "./Navbar";
import { Phone, Mail, MapPin, ShieldAlert, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/config/company";

const socialLinks = [
	{
		name: "Facebook",
		href: company.social.facebook,
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
				<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
			</svg>
		)
	},
	{
		name: "Instagram",
		href: company.social.instagram,
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
				<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
				<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
				<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
			</svg>
		)
	},
	{
		name: "YouTube",
		href: company.social.youtube,
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
				<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
				<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
			</svg>
		)
	},
];

const companyLinks = [
	{ name: "About Us", href: "/about" },
	{ name: "Our Services", href: "/services" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Contact Us", href: "/contact" },
];

export function Footer() {
	const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

	const toggleAccordion = (section: string) => {
		setActiveAccordion(activeAccordion === section ? null : section);
	};

	return (
		<footer className="bg-neutral-50 border-t border-neutral-200">
			{/* Trust Bar (IRDAI, AMFI, ISO badges) */}
			<div className="w-full bg-navy-900 text-white py-5 border-b border-navy-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 text-xs font-medium text-neutral-300 text-center">
					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						<span>AMFI Registered Mutual Fund Distributor</span>
						<span>LIC MDRT (USA) Member Since 2007</span>
					</div>
					<span className="flex items-center gap-1.5 text-emerald-400">
						<ShieldAlert className="h-4 w-4" /> Licensed &amp; Regulated Advisory
					</span>
				</div>
			</div>

			{/* Main Grid Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
				{/* Desktop Layout */}
				<div className="hidden md:grid grid-cols-12 gap-12">
					{/* Brand Column */}
					<div className="flex flex-col gap-5 col-span-6">
						<Link href="/" className="flex items-center gap-3 group">
							<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-navy-700 to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
								{company.shortName}
							</div>
							<div className="flex flex-col leading-tight">
								<span className="font-display font-bold text-lg tracking-tight text-navy-900 group-hover:text-blue-600 transition-colors">
									{company.name}
								</span>
								<span className="text-[10px] text-neutral-400 font-medium tracking-wide">
									{company.tagline}
								</span>
							</div>
						</Link>
						<p className="text-sm text-neutral-500 leading-relaxed max-w-sm font-body font-light">
							A trusted financial advisory helping families across Tamil Nadu plan their savings, insurance, and investments with honest, personal guidance.
						</p>
						<div className="flex items-center gap-3 mt-1">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="h-9 w-9 rounded-full border border-neutral-350 bg-white flex items-center justify-center text-neutral-500 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-300"
									aria-label={social.name}
								>
									<social.icon className="h-4.5 w-4.5" />
								</a>
							))}
						</div>
					</div>

					{/* Services Column */}
					<div className="col-span-3 flex flex-col gap-4">
						<h3 className="text-[11px] font-bold text-navy-900 uppercase tracking-widest">
							Services
						</h3>
						<ul className="flex flex-col gap-3 font-body">
							{servicesList.map((service) => (
								<li key={service.name}>
									<Link
										href={service.href}
										className="text-sm text-neutral-500 hover:text-blue-700 transition-colors font-light"
									>
										{service.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Column */}
					<div className="col-span-3 flex flex-col gap-4">
						<h3 className="text-[11px] font-bold text-navy-900 uppercase tracking-widest">
							Company
						</h3>
						<ul className="flex flex-col gap-3 font-body">
							{companyLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-neutral-500 hover:text-blue-700 transition-colors font-light"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Mobile Accordion Layout */}
				<div className="flex flex-col md:hidden gap-6">
					{/* Logo and Intro */}
					<div className="flex flex-col gap-4">
						<Link href="/" className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-lg bg-gradient-to-br from-navy-700 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
								{company.shortName}
							</div>
							<div className="flex flex-col leading-tight">
								<span className="font-display font-bold text-base tracking-tight text-navy-900">
									{company.name}
								</span>
								<span className="text-[9px] text-neutral-400 tracking-wide">
									Your Trust, Our Responsibility
								</span>
							</div>
						</Link>
						<p className="text-sm text-neutral-500 leading-relaxed font-body font-light">
							A trusted financial advisory helping families across Tamil Nadu.
						</p>
					</div>

					<div className="h-[1px] bg-neutral-200/80" />

					{/* Accordion: Services */}
					<div className="border-b border-neutral-200/60 pb-3">
						<button
							type="button"
							onClick={() => toggleAccordion("services")}
							aria-expanded={activeAccordion === "services"}
							aria-controls="footer-services-menu"
							className="flex items-center justify-between w-full text-left font-bold text-xs uppercase tracking-wider text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded min-h-[44px] py-2"
						>
							SERVICES
							<ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeAccordion === "services" && "rotate-180")} />
						</button>
						{activeAccordion === "services" && (
							<ul id="footer-services-menu" className="flex flex-col gap-3 mt-2 pb-2 pl-1 font-body">
								{servicesList.map((service) => (
									<li key={service.name}>
										<Link href={service.href} className="text-sm text-neutral-500 font-light inline-block py-1">
											{service.name}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Accordion: Company */}
					<div className="border-b border-neutral-200/60 pb-3">
						<button
							type="button"
							onClick={() => toggleAccordion("company")}
							aria-expanded={activeAccordion === "company"}
							aria-controls="footer-company-menu"
							className="flex items-center justify-between w-full text-left font-bold text-xs uppercase tracking-wider text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded min-h-[44px] py-2"
						>
							COMPANY
							<ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeAccordion === "company" && "rotate-180")} />
						</button>
						{activeAccordion === "company" && (
							<ul id="footer-company-menu" className="flex flex-col gap-3 mt-2 pb-2 pl-1 font-body">
								{companyLinks.map((link) => (
									<li key={link.name}>
										<Link href={link.href} className="text-sm text-neutral-500 font-light inline-block py-1">
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Mobile Social */}
					<div className="flex items-center gap-3 mt-1">
						{socialLinks.map((social) => (
							<a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="h-11 w-11 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-500"
								aria-label={social.name}
							>
								<social.icon className="h-5 w-5" />
							</a>
						))}
					</div>
				</div>

				{/* Contact Details Quickstrip */}
				<div className="border-t border-neutral-200/80 mt-12 pt-8 md:mt-16">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-500 pb-2">
						<a href={company.phone.href} className="flex items-center gap-3 hover:text-blue-700 transition-colors group">
							<div className="h-8 w-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-700 border border-blue-100/30 shrink-0 group-hover:bg-blue-100/50 transition-colors">
								<Phone className="h-4 w-4 shrink-0" />
							</div>
							<span className="font-body font-light text-neutral-600 group-hover:text-blue-700 transition-colors">{company.phone.display} <span className="text-xs text-neutral-400">({company.officeHours.short})</span></span>
						</a>
						<a href={company.email.href} className="flex items-center gap-3 hover:text-blue-700 transition-colors group">
							<div className="h-8 w-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-700 border border-blue-100/30 shrink-0 group-hover:bg-blue-100/50 transition-colors">
								<Mail className="h-4 w-4 shrink-0" />
							</div>
							<span className="font-body font-light text-neutral-600 group-hover:text-blue-700 transition-colors">{company.email.display}</span>
						</a>
						<div className="flex items-start gap-3">
							<div className="h-8 w-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-700 border border-blue-100/30 shrink-0 mt-0.5">
								<MapPin className="h-4 w-4 shrink-0" />
							</div>
							<span className="font-body font-light text-neutral-600 mt-1">{company.address.short}</span>
						</div>
					</div>
				</div>

				<div className="h-[1px] bg-neutral-200/60 my-8" />

				{/* Bottom Bar: Copyright & Mutual Funds Disclaimer */}
				<div className="flex flex-col gap-5">
					<p className="text-[11px] text-neutral-450 leading-relaxed text-center md:text-left font-body font-light">
						*Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Insurance is the subject matter of solicitation.
					</p>
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-body">
						<div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center md:text-left">
							<span className="font-light">&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</span>
							<span className="text-xs text-neutral-500 font-light">
								Developed by{" "}
								<a
									href="https://www.linkedin.com/in/vijaynanthakumar"
									target="_blank"
									rel="noopener noreferrer"
									className="font-medium text-navy-900 hover:text-blue-700 transition-colors"
								>
									Vijay N
								</a>
							</span>
						</div>
						<div className="flex items-center gap-6 font-light">
							<Link href="/privacy-policy" className="hover:text-blue-700 transition-colors">Privacy Policy</Link>
							<Link href="/terms-of-use" className="hover:text-blue-700 transition-colors">Terms of Use</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
