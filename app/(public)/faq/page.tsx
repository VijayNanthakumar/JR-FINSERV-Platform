"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { Button } from "@/components/common/Button";
import { Search, HelpCircle, MessageSquare } from "lucide-react";
import { company } from "@/config/company";

const faqData = [
	// General FAQs
	{
		question: `What is ${company.name}'s primary business model?`,
		answer: "We are a certified corporate financial services agency. We provide certified mutual fund distribution advising and licensed IRDAI insurance consultancy. Our focus is on long-term client relationships rather than quick commission sales.",
		category: "general",
	},
	{
		question: `Where is ${company.name} registered and regulated?`,
		answer: "We are an AMFI Registered Mutual Fund Distributor, and our Managing Director is an LIC MDRT (USA) Member since 2007, a Chairman's Club Member, and a Star Health Elite Advisor.",
		category: "general",
	},
	// Mutual Funds FAQs
	{
		question: "What is a Systematic Investment Plan (SIP)?",
		answer: "A SIP is a method of investing a fixed sum regularly (monthly or quarterly) into selected mutual fund schemes. It facilitates disciplined savings, utilizes rupee-cost averaging, and reduces the risk of timing the market.",
		category: "mutual-funds",
	},
	{
		question: "How do I choose between Equity and Debt funds?",
		answer: "Equity funds invest in corporate shares, offering higher returns but carry higher short-term risk. Debt funds invest in treasury bills and government bonds, offering steady, lower-risk returns. Our advisors will audit your age, goals, and risk profile to outline appropriate investment splits.",
		category: "mutual-funds",
	},
	// LIC FAQs
	{
		question: "What is LIC term insurance?",
		answer: "Term insurance is a pure protection policy that pays a guaranteed sum assured to your nominees in the event of death during the policy term. It has no maturity or survival benefit, allowing you to secure massive covers for very low monthly premiums.",
		category: "lic",
	},
	{
		question: "How long does it take for LIC claims to settle?",
		answer: `Once nominees submit death certificates and policy certificates, LIC claims are processed quickly. ${company.name} maintains a dedicated offline claims assistance desk that handholds nominees during documentation and bank transfers.`,
		category: "lic",
	},
	// Health FAQs
	{
		question: "What is cashless hospitalization cover?",
		answer: "Cashless cover allows you to get treated at network hospitals without paying admission deposits or medical bills upfront. The hospital bill is settled directly by the insurer. You only pay for non-medical expenses like registration or food.",
		category: "health",
	},
	{
		question: "What is the waiting period for pre-existing diseases?",
		answer: "Pre-existing diseases (like thyroid, diabetes, or asthma) are covered under retail health insurance after a continuous policy renewal period of 3 years (reduced from 4 years under latest IRDAI rules).",
		category: "health",
	},
	// Vehicle FAQs
	{
		question: "What is Zero Depreciation car insurance?",
		answer: "Zero Depreciation is an add-on cover. In standard comprehensive policies, insurers deduct depreciation on rubber, glass, and metal parts during claims. A Zero-Dep cover pays the full replacement value without deductions, minimizing your out-of-pocket costs.",
		category: "general-insurance",
	},
	// General FAQs
	{
		question: "What is commercial general liability?",
		answer: "It protects business owners from financial damages arising out of third-party bodily injuries, property damage, or operational accidents occurring on business premises.",
		category: "general-insurance",
	},
	// Billing
	{
		question: `Can I pay premiums through the ${company.name} portal?`,
		answer: "Yes. Our client portal allows you to secure direct payment links to LIC, Star Health, and other insurers. All receipts are archived in your Documents tab automatically.",
		category: "billing",
	},
];

export default function FAQPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const breadcrumbItems = [{ name: "FAQ" }];

	const categories = [
		{ id: "all", label: "All Questions" },
		{ id: "general", label: "General Info" },
		{ id: "lic", label: "LIC Life Insurance" },
		{ id: "health", label: "Star Health Insurance" },
		{ id: "general-insurance", label: "General & Vehicle Insurance" },
		{ id: "mutual-funds", label: "Mutual Funds" },
		{ id: "billing", label: "Billing & Payments" },
	];

	// Filter logic
	const filteredFAQs = faqData.filter((item) => {
		const matchesCategory = activeCategory === "all" || item.category === activeCategory;
		const matchesSearch =
			item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.answer.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="flex flex-col w-full">
			{/* Page Banner */}
			<PageBanner
				title="Frequently Asked Questions"
				description="Search through detailed guidelines covering mutual fund SIPs, LIC terminations, claims waiting periods, and portal receipts."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Search Input Bar */}
			<section className="py-8 bg-white dark:bg-navy-950 border-b border-neutral-100 dark:border-navy-900/60">
				<div className="max-w-xl mx-auto px-4 sm:px-6 flex items-center">
					<div className="relative w-full">
						<Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400 dark:text-neutral-500" />
						<input
							type="text"
							placeholder="Search mutual fund rates, LIC claims, room rent..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-12 w-full pl-12 pr-4 bg-neutral-50 dark:bg-navy-900 border border-neutral-200 dark:border-navy-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-sm placeholder-neutral-400 text-neutral-800 dark:text-neutral-100"
						/>
					</div>
				</div>
			</section>

			{/* Category Selector & FAQs */}
			<section className="py-20 md:py-28 bg-neutral-50 dark:bg-navy-900/40">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
					{/* Category chips */}
					<div className="flex flex-wrap justify-center gap-2 overflow-x-auto py-1 max-w-full">
						{categories.map((cat) => (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`h-9 px-4 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
									activeCategory === cat.id
										? "bg-blue-600 border-blue-600 text-white shadow-xs"
										: "bg-white dark:bg-navy-800 border-neutral-200 dark:border-navy-750 text-neutral-600 dark:text-neutral-300 hover:border-blue-600/30"
								}`}
								dangerouslySetInnerHTML={{ __html: cat.label }}
							/>
						))}
					</div>

					{/* Accordion container */}
					<div className="bg-white dark:bg-navy-800 border border-neutral-200 dark:border-navy-750 rounded-xl p-6 md:p-8 shadow-xs">
						{filteredFAQs.length > 0 ? (
							<FAQAccordion items={filteredFAQs} />
						) : (
							<div className="py-8 text-center text-neutral-500 dark:text-neutral-450 text-sm">
								No results match your search query. Please try searching other financial terms.
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Help Desk Callout */}
			<section className="py-16 md:py-24 bg-white dark:bg-navy-950 border-t border-neutral-200 dark:border-navy-900">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
					<div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
						<HelpCircle className="h-6 w-6" />
					</div>
					<h3 className="font-display font-bold text-2xl text-navy-900 dark:text-white">
						Still Have Questions Regarding Claims or Ratios?
					</h3>
					<p className="text-sm text-neutral-500 dark:text-neutral-450 max-w-lg leading-relaxed font-body">
						Our advisory desks are available {company.officeHours.short}. Call directly to speak with Ln. V. Janarthanam or our claims coordination specialists.
					</p>
					<div className="mt-2 flex flex-col sm:flex-row gap-4 w-full justify-center">
						<Link href="/contact" className="w-full sm:w-auto">
							<Button variant="primary-gradient" className="w-full sm:w-auto">
								Contact Support Desk
							</Button>
						</Link>
						<a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
							<Button variant="secondary" className="w-full sm:w-auto inline-flex items-center gap-2">
								<MessageSquare className="h-4 w-4 text-emerald-500 fill-current" />
								<span>WhatsApp Advisory</span>
							</Button>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
