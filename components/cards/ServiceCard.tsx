"use client";


import Link from "next/link";
import Image from "next/image";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
	name: string;
	href: string;
	description: string;
	icon: LucideIcon;
	bgColor: string;
	iconColor: string;
	image?: string;
	features?: string[];
}

export function ServiceCard({
	name,
	href,
	description,
	icon: Icon,
	bgColor,
	iconColor,
	image,
	features = [],
}: ServiceCardProps) {
	return (
		<motion.div
			whileHover={{ y: -6 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(10,27,51,0.02)] hover:shadow-[0_12px_30px_rgba(10,27,51,0.06)] hover:border-blue-500/20 rounded-2xl flex flex-col justify-between group h-full overflow-hidden transition-all duration-300"
		>
			<div className="flex flex-col">
				{/* Top Image Banner */}
				{image && (
					<div className="relative w-full h-44 overflow-hidden border-b border-neutral-100">
						<Image
							src={image}
							alt={name}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							loading="lazy"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						{/* Subtle top overlay */}
						<div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
					</div>
				)}

				<div className="p-6 md:p-7 flex flex-col gap-4">
					{/* Colour-coded icon badge */}
					<div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border border-neutral-100/10 shadow-xs transition-transform duration-300 group-hover:scale-105", bgColor)}>
						<Icon className={cn("h-5 w-5", iconColor)} />
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="font-display font-bold text-lg md:text-xl text-navy-900 group-hover:text-blue-600 transition-colors duration-200">
							{name}
						</h3>
						<p className="text-sm text-neutral-500 leading-relaxed font-body font-light line-clamp-3">
							{description}
						</p>
					</div>

					{/* Optional features list */}
					{features.length > 0 && (
						<ul className="flex flex-col gap-2 mt-2 border-t border-neutral-100 pt-3">
							{features.slice(0, 3).map((feat, idx) => (
								<li key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
									<span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
									<span>{feat}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="px-6 pb-6 md:px-7 md:pb-7">
				<div className="w-full h-[1px] bg-neutral-100 mb-4" />
				<Link
					href={href}
					className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 hover:text-blue-600 group/link transition-colors"
				>
					Explore Service
					<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
				</Link>
			</div>
		</motion.div>
	);
}
