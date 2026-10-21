"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
	name: string;
	location: string;
	role?: string;
	rating: number;
	quote: string;
	serviceTag?: string;
	delay?: number;
}

export function TestimonialCard({
	name,
	location,
	role,
	rating,
	quote,
	serviceTag,
	delay = 0,
}: TestimonialCardProps) {
	// Generate fallback initials
	const getInitials = (fullName: string) => {
		const parts = fullName.split(" ");
		return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
			className="bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(10,27,51,0.02)] hover:shadow-[0_12px_30px_rgba(10,27,51,0.06)] hover:border-blue-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative group hover:-translate-y-1 transition-all duration-300 ease-out"
		>
			{/* Quote Icon Background */}
			<div className="absolute top-6 right-6 text-neutral-100 group-hover:text-blue-50/50 transition-colors duration-300 pointer-events-none">
				<Quote className="h-9 w-9 rotate-180 fill-current" />
			</div>

			<div className="flex flex-col gap-4 relative z-10">
				{/* Star Rating */}
				<div className="flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, idx) => (
						<Star
							key={idx}
							className={cn(
								"h-4 w-4 shrink-0",
								idx < rating
									? "text-amber-500 fill-amber-500"
									: "text-neutral-200"
							)}
						/>
					))}
				</div>

				{/* Quote in Playfair Display font */}
				<blockquote className="font-display italic text-base md:text-[17px] text-neutral-700 leading-relaxed mt-2">
					&ldquo;{quote}&rdquo;
				</blockquote>
			</div>

			{/* User details footer */}
			<div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-neutral-100">
				{/* Avatar */}
				<div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
					{getInitials(name)}
				</div>

				<div className="flex flex-col flex-1 min-w-0">
					<span className="font-semibold text-sm text-navy-900 truncate">
						{name}
					</span>
					<span className="text-xs text-neutral-500 truncate font-body font-light">
						{location} {role && `· ${role}`}
					</span>
				</div>

				{serviceTag && (
					<span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded-lg shrink-0">
						{serviceTag}
					</span>
				)}
			</div>
		</motion.div>
	);
}
