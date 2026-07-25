"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import {
	ChevronLeft,
	ChevronRight,
	ShieldCheck,
	Users,
	Headphones,
	Award,
} from "lucide-react";
import type { HeroSlide } from "@/types/cms";

// ─── Fallback hardcoded slides (shown when CMS is empty) ─────────────────────

const FALLBACK_SLIDES: HeroSlide[] = [
	{
		id: "fallback-1",
		title: "Secure Today. Grow Tomorrow.",
		subtitle:
			"From investments to insurance, we provide reliable and personalised financial solutions that help you secure your present and build a better future.",
		primary_cta_text: "Explore Our Services",
		primary_cta_link: "/services",
		secondary_cta_text: "Speak to an Advisor",
		secondary_cta_link: "/contact",
		image_url: "/images/hero/hero-family.png",
		background_image_url: null,
		is_active: true,
		display_order: 0,
		created_at: "",
		updated_at: "",
	},
	{
		id: "fallback-2",
		title: "Clarity Over Commission.",
		subtitle:
			"Unbiased mutual fund advisory calibrated to your goals — every recommendation explained, every fee disclosed upfront.",
		primary_cta_text: "View Mutual Funds",
		primary_cta_link: "/services/mutual-funds",
		secondary_cta_text: "Talk to an Advisor",
		secondary_cta_link: "/contact",
		image_url: "/images/hero/hero-advisory.png",
		background_image_url: null,
		is_active: true,
		display_order: 1,
		created_at: "",
		updated_at: "",
	},
	{
		id: "fallback-3",
		title: "Protection That Shows Up.",
		subtitle:
			"LIC, health, general, and vehicle insurance with dedicated claims support from application to settlement.",
		primary_cta_text: "View Insurance Plans",
		primary_cta_link: "/services",
		secondary_cta_text: "Talk to an Advisor",
		secondary_cta_link: "/contact",
		image_url: "/images/hero/hero-insurance.png",
		background_image_url: null,
		is_active: true,
		display_order: 2,
		created_at: "",
		updated_at: "",
	},
];

const AUTOPLAY_MS = 5000;

const quickStats = [
	{ icon: ShieldCheck, value: "AMFI", label: "Registered Distributor" },
	{ icon: Users, value: "3,500+", label: "Happy Customers" },
	{ icon: Award, value: "24+", label: "Countries Served" },
	{ icon: Headphones, value: "24/7", label: "Assistance" },
];

interface HeroSliderProps {
	/** CMS slides — if empty or not provided, falls back to hardcoded content */
	slides?: HeroSlide[];
}

export function HeroSlider({ slides: cmsSlides }: HeroSliderProps) {
	const slides =
		cmsSlides && cmsSlides.length > 0 ? cmsSlides : FALLBACK_SLIDES;

	const [active, setActive] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const goTo = useCallback(
		(index: number) => {
			setActive(((index % slides.length) + slides.length) % slides.length);
		},
		[slides.length]
	);

	const next = useCallback(() => goTo(active + 1), [active, goTo]);
	const prev = useCallback(() => goTo(active - 1), [active, goTo]);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			setActive((current) => (current + 1) % slides.length);
		}, AUTOPLAY_MS);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [active, slides.length]);

	const slide = slides[active];

	return (
		<section className="relative w-full bg-white pt-32 pb-20 md:pt-40 lg:pt-[196px] lg:pb-28 overflow-hidden">
			{/* Faint ambient accents */}
			<div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-blue-50/50 rounded-full filter blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-emerald-50/50 rounded-full filter blur-[90px] pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
				{/* Left: Text content */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="lg:col-span-6 flex flex-col gap-8 text-left"
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={slide.id}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="flex flex-col gap-6"
						>
							<span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 w-fit">
								<ShieldCheck className="h-3.5 w-3.5" /> 3,500+ Happy Customers
							</span>

							<h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 tracking-tight leading-[1.12]">
								{slide.title}
							</h1>

							{slide.subtitle && (
								<p className="text-base sm:text-lg text-neutral-600 max-w-lg leading-relaxed font-body font-light">
									{slide.subtitle}
								</p>
							)}

							<div className="flex flex-col sm:flex-row gap-4 mt-2">
								{slide.primary_cta_text && slide.primary_cta_link && (
									<Link href={slide.primary_cta_link}>
										<Button
											variant="primary-gradient"
											size="lg"
											className="w-full sm:w-auto px-8 shadow-md hover:shadow-lg transition-all duration-300"
										>
											{slide.primary_cta_text}
										</Button>
									</Link>
								)}
								{slide.secondary_cta_text && slide.secondary_cta_link && (
									<Link href={slide.secondary_cta_link}>
										<Button
											variant="secondary"
											size="lg"
											className="w-full sm:w-auto px-8 transition-colors duration-300"
										>
											{slide.secondary_cta_text}
										</Button>
									</Link>
								)}
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Quick stat row */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-4 border-t border-neutral-100"
					>
						{quickStats.map((stat) => (
							<div key={stat.label} className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 border border-blue-100/30">
									<stat.icon className="h-5 w-5" />
								</div>
								<div className="flex flex-col leading-tight">
									<span className="text-sm font-bold text-navy-900 font-body">
										{stat.value}
									</span>
									<span className="text-[11px] font-medium text-neutral-500 tracking-wide mt-0.5">
										{stat.label}
									</span>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* Right: Image slider */}
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="lg:col-span-6 relative"
				>
					<div className="relative">
						<div className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(10,27,51,0.08)] border border-neutral-200/60">
							<AnimatePresence mode="sync">
								<motion.img
									key={slide.id}
									src={slide.image_url ?? "/images/hero/hero-family.png"}
									alt={slide.title}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.6, ease: "easeInOut" }}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							</AnimatePresence>

							{/* Bottom overlay panel */}
							<div className="absolute bottom-0 inset-x-0 z-20 rounded-b-[32px] overflow-hidden">
								<div className="relative h-[130px] sm:h-[136px] px-6 sm:px-8 py-4 flex flex-col justify-between bg-navy-900/90 backdrop-blur-md border-t border-white/10">
									<AnimatePresence mode="wait">
										<motion.div
											key={slide.id}
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.35, ease: "easeOut" }}
											className="flex gap-3"
										>
											<span className="w-1 rounded-full bg-emerald-500 shrink-0" />
											<div className="flex flex-col gap-1 min-w-0">
												<h3 className="font-display font-semibold text-base sm:text-lg text-white leading-snug truncate">
													{slide.primary_cta_text ?? slide.title}
												</h3>
												<p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
													{slide.subtitle ?? ""}
												</p>
											</div>
										</motion.div>
									</AnimatePresence>

									{/* Dot indicators */}
									<div className="flex items-center justify-center gap-2">
										{slides.map((s, index) => (
											<button
												key={s.id}
												onClick={() => goTo(index)}
												aria-label={`Go to slide ${index + 1}`}
												className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
												style={{
													width: index === active ? 20 : 6,
													backgroundColor:
														index === active
															? "#16A365"
															: "rgba(255,255,255,0.4)",
												}}
											/>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Navigation arrows */}
						<button
							onClick={prev}
							aria-label="Previous slide"
							className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white text-navy-800 shadow-[0_4px_12px_rgba(10,27,51,0.1)] border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							onClick={next}
							aria-label="Next slide"
							className="absolute top-1/2 -translate-y-1/2 -right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white text-navy-800 shadow-[0_4px_12px_rgba(10,27,51,0.1)] border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
