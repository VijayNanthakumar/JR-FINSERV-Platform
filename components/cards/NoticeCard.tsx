"use client";


import { ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NoticeCardProps {
	title: string;
	date: string; // "DD"
	month: string; // "MMM"
	year: string; // "YYYY"
	excerpt: string;
	category: "regulatory" | "policy-update" | "announcement";
	isImportant?: boolean;
	onClick?: () => void;
}

export function NoticeCard({
	title,
	date,
	month,
	year,
	excerpt,
	category,
	isImportant = false,
	onClick,
}: NoticeCardProps) {
	const categoryLabels = {
		regulatory: "Regulatory Update",
		"policy-update": "Policy Update",
		announcement: "Notice Board",
	};

	const categoryBadgeClasses = {
		regulatory: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
		"policy-update": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
		announcement: "bg-neutral-100 text-neutral-800 dark:bg-navy-700 dark:text-neutral-300",
	};

	return (
		<div
			onClick={onClick}
			className={cn(
				"group relative flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 rounded-xl border bg-white dark:bg-navy-800 transition-all duration-200 cursor-pointer shadow-xs",
				isImportant
					? "border-amber-400 dark:border-amber-600/50 hover:bg-amber-50/20 dark:hover:bg-amber-950/10"
					: "border-neutral-200 dark:border-navy-750 hover:bg-neutral-50/50 dark:hover:bg-navy-900/20 hover:border-blue-500/20 dark:hover:border-blue-500/20"
			)}
		>
			{/* Left side: Date Block & Content */}
			<div className="flex items-start gap-4 flex-1">
				{/* Date Block */}
				<div className="flex flex-col items-center justify-center h-14 w-14 shrink-0 rounded-lg bg-navy-700 text-white dark:bg-navy-900 border border-navy-600 font-body text-center p-2">
					<span className="text-lg font-bold leading-none tabular-nums">{date}</span>
					<span className="text-[10px] font-semibold uppercase tracking-wider mt-1">{month}</span>
				</div>

				{/* Notice Title & Excerpt */}
				<div className="flex flex-col gap-1.5 pr-2">
					<div className="flex flex-wrap items-center gap-2">
						{isImportant && (
							<span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
								<AlertCircle className="h-3 w-3 shrink-0" /> IMPORTANT
							</span>
						)}
						<span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-transparent", categoryBadgeClasses[category])}>
							{categoryLabels[category]}
						</span>
						<span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
							{year}
						</span>
					</div>

					<h3 className="font-display font-bold text-base md:text-lg text-navy-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 leading-snug">
						{title}
					</h3>
					<p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 md:line-clamp-1">
						{excerpt}
					</p>
				</div>
			</div>

			{/* Right side: Click Action Trigger */}
			<div className="flex items-center justify-end w-full md:w-auto mt-4 md:mt-0 border-t border-neutral-100 dark:border-navy-750 md:border-t-0 pt-3 md:pt-0 shrink-0">
				<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 transform md:translate-x-2 md:group-hover:translate-x-0">
					View Notice
					<ChevronRight className="h-4 w-4" />
				</span>
			</div>
		</div>
	);
}
