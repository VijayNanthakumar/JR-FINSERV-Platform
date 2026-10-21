"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AchievementCardProps {
	number: number;
	suffix?: string;
	prefix?: string;
	label: string;
	colorVariant?: "navy" | "blue" | "emerald";
	className?: string;
}

export function AchievementCard({
	number,
	suffix = "",
	prefix = "",
	label,
	colorVariant = "blue",
	className,
}: AchievementCardProps) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	useEffect(() => {
		if (isInView) {
			let start = 0;
			const end = number;
			if (end === 0) return;

			// Duration is 1.5 seconds
			const totalMiliseconds = 1500;
			const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
			
			const timer = setInterval(() => {
				start += Math.ceil(end / 60); // Advance in chunks
				if (start >= end) {
					clearInterval(timer);
					setCount(end);
				} else {
					setCount(start);
				}
			}, incrementTime);

			return () => clearInterval(timer);
		}
	}, [isInView, number]);

	const colorStyles = {
		navy: "text-navy-700 dark:text-navy-300",
		blue: "text-blue-600 dark:text-blue-400",
		emerald: "text-emerald-600 dark:text-emerald-400",
	};

	// Format numbers nicely, adding commas if needed
	const formattedCount = count.toLocaleString("en-IN");

	return (
		<div
			ref={ref}
			className={cn(
				"bg-white dark:bg-navy-800 border border-neutral-100 dark:border-navy-750 p-6 md:p-8 rounded-xl shadow-xs hover:shadow-md transition-shadow text-center flex flex-col gap-2 justify-center items-center h-full min-h-[160px]",
				className
			)}
		>
			<span className={cn("font-display font-bold text-3xl md:text-5xl tracking-tight tabular-nums", colorStyles[colorVariant])}>
				<span>{prefix}</span>
				<span>{formattedCount}</span>
				<span>{suffix}</span>
			</span>
			<span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-1">
				{label}
			</span>
		</div>
	);
}
