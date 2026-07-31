"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { company } from "@/config/company";

export function FounderSection() {
	return (
		<section className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
				{/* Photo */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="lg:col-span-5 relative"
				>
					<div className="absolute -inset-3 rounded-[32px] bg-blue-50/70 -rotate-2 scale-[1.02] pointer-events-none border border-blue-100/30" />
					<div className="absolute -inset-3 rounded-[32px] border border-neutral-200/50 pointer-events-none" />
					<div className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(10,27,51,0.06)] border border-neutral-200">
						<Image
							src="/images/founder/founder.png"
							alt="Ln. V. Janarthanam, Managing Director"
							fill
							priority
							unoptimized
							className="object-cover"
						/>
					</div>
				</motion.div>

				{/* Bio */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
					className="lg:col-span-7 flex flex-col gap-6 text-left"
				>
					<div className="flex flex-col gap-1.5">
						<span className="text-xs font-bold uppercase tracking-widest text-blue-700">Meet Our Founder</span>
						<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
							Ln. V. Janarthanam
						</h2>
						<p className="text-sm font-semibold text-neutral-500 font-body">
							AMFI Registered Mutual Fund Distributor &middot; LIC MDRT (USA) Member
						</p>
					</div>

					<div className="h-[1px] bg-neutral-100 w-24" />

					<blockquote className="font-display italic text-lg sm:text-xl text-neutral-800 leading-relaxed pl-4 border-l-2 border-emerald-600">
						&ldquo;Every client who walks through our door gets the same honest advice I would give my own family. That is a promise I stand behind personally.&rdquo;
					</blockquote>

					<div className="grid grid-cols-2 gap-4 mt-2 max-w-lg">
						<div className="flex flex-col border-l border-neutral-200 pl-4 py-1">
							<span className="text-2xl font-bold text-navy-900">30+ Years</span>
							<span className="text-xs text-neutral-500 mt-1 uppercase font-semibold tracking-wider font-body">Experience</span>
						</div>
						<div className="flex flex-col border-l border-neutral-200 pl-4 py-1">
							<span className="text-2xl font-bold text-navy-900">3,500+</span>
							<span className="text-xs text-neutral-500 mt-1 uppercase font-semibold tracking-wider font-body">Families Guided</span>
						</div>
					</div>

					<p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-body font-light">
						Since 2007, I have directed {company.name} with one goal: to guide families across Tamil Nadu in securing their futures using clear, jargon-free advice. Today, we advise over 3,500 clients globally.
					</p>

					<div className="flex flex-wrap items-center gap-3">
						{["AMFI Registered", "LIC MDRT (USA) Since 2007", "Star Health Elite Advisor"].map((badge) => (
							<div key={badge} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 bg-white border border-neutral-200/80 px-3 py-2 rounded-xl">
								<ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
								{badge}
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
