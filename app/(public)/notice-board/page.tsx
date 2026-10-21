"use client";

import React, { useState } from "react";
import { PageBanner } from "@/components/common/PageBanner";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { Button } from "@/components/common/Button";
import { X, Download, ShieldAlert, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const noticesList = [
	{
		id: 1,
		title: "KYC Re-verification Deadline Extended to September 30, 2026",
		date: "14",
		month: "JUL",
		year: "2026",
		excerpt: "AMFI has announced an extension for mutual fund investors to re-verify KYC documents. Read details on requirements.",
		category: "regulatory" as const,
		isImportant: true,
		details: "The Association of Mutual Funds in India (AMFI) in consultation with SEBI has extended the deadline for the re-verification of KYC details (including registered mobile numbers and Aadhaar linkage) to September 30, 2026. Non-compliant mutual fund folios may be frozen after this date, restricting SIP transactions and redemptions. Please upload your Aadhaar/PAN copy via your Document Upload dashboard or submit physical forms at our BKC branch.",
	},
	{
		id: 2,
		title: "IRDAI Guidelines on Health Insurance Pre-existing Disease Waiting Period",
		date: "08",
		month: "JUL",
		year: "2026",
		excerpt: "IRDAI reduces maximum pre-existing disease waiting period from 4 years to 3 years. Read compliance changes.",
		category: "regulatory" as const,
		isImportant: true,
		details: "Under the latest circular issued by the Insurance Regulatory and Development Authority of India (IRDAI), the maximum waiting period for coverage of pre-existing diseases (PED) under all retail health insurance policies has been reduced from 48 months (4 years) to 36 months (3 years). This applies to all new policies issued as well as renewals. Existing policyholders will benefit from this shorter waiting period automatically upon their next renewal.",
	},
	{
		id: 3,
		title: "New Sovereign Gold Bond Scheme 2026-27 Series Open for Subscription",
		date: "05",
		month: "JUL",
		year: "2026",
		excerpt: "The Government of India has announced subscription windows for Sovereign Gold Bonds offering 2.5% fixed interest.",
		category: "announcement" as const,
		details: "The Government of India, in consultation with the Reserve Bank of India, has opened the Sovereign Gold Bond Scheme 2026-27 Series I for subscription. The bonds offer a fixed interest rate of 2.50% per annum payable half-yearly on the nominal value, combined with capital appreciation potential tied to market gold rates. Subscriptions can be routed through our investment advisors online or offline.",
	},
	{
		id: 4,
		title: "Grace Period Extension for LIC Premium Payments due to Floods",
		date: "28",
		month: "JUN",
		year: "2026",
		excerpt: "LIC extends payment grace period by 30 days for policies in flood-affected districts of Maharashtra.",
		category: "policy-update" as const,
		details: "In response to recent heavy monsoon floods, the Life Insurance Corporation of India (LIC) has announced a special 30-day grace period extension for premium payments due in June and July 2026. This extension applies to policyholders residing in designated flood-affected districts in coastal Maharashtra. No late fee or interest will be charged during this extended period.",
	},
	{
		id: 5,
		title: "Annual BKC Branch Maintenance Scheduled for August 15-16",
		date: "20",
		month: "JUN",
		year: "2026",
		excerpt: "Our Mumbai head branch will undergo routine systems maintenance. Call advisory desks will remain active.",
		category: "announcement" as const,
		details: "Please note that our BKC branch office in Mumbai will undergo routine IT systems and electrical infrastructure maintenance from August 15 (Friday) to August 16 (Saturday). Physical branch counters will remain closed. However, our telephone advisory desks and online client portals will remain fully operational for urgent queries.",
	},
];

export default function NoticeBoardPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);

	const breadcrumbItems = [{ name: "Notice Board" }];

	const categories = [
		{ id: "all", label: "All Notices" },
		{ id: "regulatory", label: "Regulatory Updates" },
		{ id: "policy-update", label: "Policy Updates" },
		{ id: "announcement", label: "General Announcements" },
	];

	// Filter
	const filteredNotices = noticesList.filter((notice) => {
		if (activeCategory === "all") return true;
		return notice.category === activeCategory;
	});

	// Sort notices so important ones are always on top
	const sortedNotices = [...filteredNotices].sort((a, b) => {
		if (a.isImportant && !b.isImportant) return -1;
		if (!a.isImportant && b.isImportant) return 1;
		return 0;
	});

	const activeNotice = noticesList.find((n) => n.id === selectedNoticeId);

	return (
		<div className="flex flex-col w-full relative">
			{/* Page Banner */}
			<PageBanner
				title="Notice Board &amp; Announcements"
				description="Official bulletin board for regulatory IRDAI updates, compliance schedules, and policy advisories."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Category Filter Section */}
			<section className="py-12 bg-white dark:bg-navy-950 border-b border-neutral-100 dark:border-navy-900/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 items-center md:items-start text-center">
					<span className="text-xs font-bold uppercase tracking-widest text-neutral-450">
						Filter Notices
					</span>
					<div className="flex flex-wrap justify-center md:justify-start gap-3 mt-1 overflow-x-auto w-full py-1">
						{categories.map((cat) => (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`h-10 px-5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
									activeCategory === cat.id
										? "bg-blue-600 border-blue-600 text-white shadow-xs"
										: "bg-neutral-50 dark:bg-navy-900 border-neutral-200 dark:border-navy-750 text-neutral-600 dark:text-neutral-300 hover:border-blue-600/30"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Notices List */}
			<section className="py-20 md:py-28 bg-neutral-50 dark:bg-navy-900/40">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
					<div className="flex flex-col gap-4 text-left">
						{sortedNotices.map((notice) => (
							<NoticeCard
								key={notice.id}
								title={notice.title}
								date={notice.date}
								month={notice.month}
								year={notice.year}
								excerpt={notice.excerpt}
								category={notice.category}
								isImportant={notice.isImportant}
								onClick={() => setSelectedNoticeId(notice.id)}
							/>
						))}

						{sortedNotices.length === 0 && (
							<div className="py-16 text-center bg-white dark:bg-navy-800 rounded-xl border border-neutral-200 dark:border-navy-750">
								<p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
									No notices found in this category.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Notice Details Modal */}
			<AnimatePresence>
				{selectedNoticeId !== null && activeNotice && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedNoticeId(null)}
							className="absolute inset-0 bg-navy-900/60 backdrop-blur-xs"
						/>

						{/* Modal Container */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 15 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 15 }}
							transition={{ type: "spring", duration: 0.4 }}
							className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-navy-750 z-10 flex flex-col"
						>
							{/* Header Ribbon for Important notices */}
							{activeNotice.isImportant && (
								<div className="bg-amber-500 text-navy-950 font-bold text-xs py-2 px-6 flex items-center gap-1.5 border-b border-amber-600/25">
									<ShieldAlert className="h-4 w-4" /> URGENT REGULATORY INSTRUCTION
								</div>
							)}

							{/* Close Button */}
							<button
								onClick={() => setSelectedNoticeId(null)}
								className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-navy-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
								aria-label="Close"
							>
								<X className="h-5 w-5" />
							</button>

							{/* Main Content Area */}
							<div className="p-6 md:p-8 flex flex-col gap-6 text-left overflow-y-auto max-h-[70vh]">
								{/* Category and Date meta details */}
								<div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
									<span className="inline-flex items-center gap-1">
										<Calendar className="h-4 w-4 text-blue-600" />
										<span>Posted {activeNotice.date} {activeNotice.month} {activeNotice.year}</span>
									</span>
									<span>·</span>
									<span className="uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
										{categories.find((c) => c.id === activeNotice.category)?.label}
									</span>
								</div>

								{/* Notice Title */}
								<h3 className="font-display font-bold text-xl md:text-2xl text-navy-900 dark:text-white leading-snug">
									{activeNotice.title}
								</h3>

								<div className="h-[1px] bg-neutral-100 dark:bg-navy-800" />

								{/* Details body copy */}
								<p className="text-sm md:text-base text-neutral-600 dark:text-neutral-350 leading-relaxed font-body">
									{activeNotice.details}
								</p>

								{/* Footer Compliance disclaimers */}
								<div className="bg-neutral-50 dark:bg-navy-950/60 border border-neutral-100 dark:border-navy-800 p-4 rounded-lg flex flex-col gap-2 mt-2">
									<h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-450 uppercase tracking-widest flex items-center gap-1.5">
										<ShieldAlert className="h-3.5 w-3.5 text-blue-600" /> Compliance Advisory
									</h4>
									<p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed">
										All regulatory notices listed are fetched directly from IRDAI, SEBI, or AMFI registers. Policyholders are advised to crosscheck deadlines against their individual policy numbers.
									</p>
								</div>
							</div>

							{/* Actions Footer */}
							<div className="bg-neutral-50 dark:bg-navy-950 px-6 py-4 border-t border-neutral-200 dark:border-navy-800/80 flex items-center justify-between gap-4">
								<Button
									variant="secondary"
									size="sm"
									className="inline-flex items-center gap-2"
									onClick={() => alert("Downloading Notice Circular PDF...")}
								>
									<Download className="h-4 w-4 shrink-0" />
									<span>Download Circular (PDF)</span>
								</Button>
								<Button
									onClick={() => setSelectedNoticeId(null)}
									variant="primary"
									size="sm"
								>
									Acknowledge Notice
								</Button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
