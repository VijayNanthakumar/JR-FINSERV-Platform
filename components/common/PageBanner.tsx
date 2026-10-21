"use client";


import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { motion } from "framer-motion";

export interface PageBannerProps {
	title: string;
	description?: string;
	breadcrumbItems: BreadcrumbItem[];
}

export function PageBanner({ title, description, breadcrumbItems }: PageBannerProps) {
	return (
		<section className="relative pt-32 pb-16 md:pt-44 lg:pt-48 md:pb-24 bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 border-b border-navy-700 overflow-hidden">
			{/* Radial Glow Accent */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
			<div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[80px] pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-4">
				{/* Breadcrumb container */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 w-fit"
				>
					<Breadcrumb items={breadcrumbItems} />
				</motion.div>

				{/* Title and details */}
				<div className="max-w-3xl mt-2">
					<motion.h1
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight"
					>
						{title}
					</motion.h1>
					{description && (
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-base md:text-lg text-neutral-300 mt-4 leading-relaxed"
						>
							{description}
						</motion.p>
					)}
				</div>
			</div>
		</section>
	);
}
