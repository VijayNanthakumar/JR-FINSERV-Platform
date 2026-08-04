"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
		secondary_cta_link: "/contact#consultation",
		image_url: "/images/hero/hero-family.webp",
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
		secondary_cta_link: "/contact#consultation",
		image_url: "/images/hero/hero-advisory.webp",
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
			"LIC, health, and general insurance with dedicated claims support from application to settlement.",
		primary_cta_text: "View Insurance Plans",
		primary_cta_link: "/services",
		secondary_cta_text: "Talk to an Advisor",
		secondary_cta_link: "/contact#consultation",
		image_url: "/images/hero/hero-insurance.webp",
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
	}, [slides.length]);

	const slide = slides[active];

	return (
		<section className="relative w-full bg-white pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 lg:pt-[196px] lg:pb-28 overflow-hidden">
			{/* Faint ambient accents */}
			<div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-blue-50/50 rounded-full filter blur-[100px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-emerald-50/50 rounded-full filter blur-[90px] pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
				{/* Left: Text content with fixed reserved container height */}
				<div className="lg:col-span-6 flex flex-col justify-between text-left h-full">
					{/* Text container reserved height prevents vertical layout shift */}
					<div className="relative min-h-[290px] sm:min-h-[310px] md:min-h-[320px] lg:min-h-[340px]">
						<AnimatePresence mode="popLayout" initial={false}>
							<motion.div
								key={slide.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
								className="flex flex-col gap-6 w-full"
							>
								<span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 w-fit">
									<ShieldCheck className="h-3.5 w-3.5" /> 3,500+ Happy Customers
								</span>

								<h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-navy-900 tracking-tight leading-[1.12] line-clamp-2">
									{slide.title}
								</h1>

								{slide.subtitle && (
									<p className="text-base sm:text-lg text-neutral-600 max-w-lg leading-relaxed font-body font-light line-clamp-3">
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
										<Link href={slide.secondary_cta_link.includes("#") ? slide.secondary_cta_link : `${slide.secondary_cta_link}#consultation`}>
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
					</div>

					{/* Quick stat row — pinned at bottom of left column, perfectly stable */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-6 border-t border-neutral-100">
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
					</div>
				</div>

				{/* Right: Fixed Image slider & fixed bottom info card */}
				<div className="lg:col-span-6 relative">
					<div className="relative">
						<div className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(10,27,51,0.08)] border border-neutral-200/60 bg-neutral-100">
							<AnimatePresence mode="popLayout" initial={false}>
								<motion.div
									key={slide.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5, ease: "easeInOut" }}
									className="absolute inset-0 w-full h-full"
								>
									<Image
										src={slide.image_url ?? "/images/hero/hero-family.webp"}
										alt={slide.title}
										fill
										priority={active === 0}
										sizes="(max-width: 1024px) 100vw, 50vw"
										className="object-cover object-center"
									/>
								</motion.div>
							</AnimatePresence>

							{/* Bottom overlay panel — fixed height, position & layout */}
							<div className="absolute bottom-0 inset-x-0 z-20 rounded-b-[32px] overflow-hidden">
								<div className="relative h-[128px] sm:h-[136px] px-6 sm:px-8 py-4 flex flex-col justify-between bg-navy-900/90 backdrop-blur-md border-t border-white/10">
									<div className="relative h-[64px] sm:h-[72px] overflow-hidden">
										<AnimatePresence mode="popLayout" initial={false}>
											<motion.div
												key={slide.id}
												initial={{ opacity: 0, y: 6 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -6 }}
												transition={{ duration: 0.35, ease: "easeOut" }}
												className="absolute inset-0 flex gap-3 items-start"
											>
												<span className="w-1 h-full rounded-full bg-emerald-500 shrink-0" />
												<div className="flex flex-col gap-0.5 min-w-0 flex-1">
													<h3 className="font-display font-semibold text-base sm:text-lg text-white leading-snug truncate">
														{slide.primary_cta_text ?? slide.title}
													</h3>
													<p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
														{slide.subtitle ?? ""}
													</p>
												</div>
											</motion.div>
										</AnimatePresence>
									</div>

									{/* Dot indicators — pinned at bottom */}
									<div className="flex items-center justify-center gap-2 pt-1">
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

						{/* Navigation arrows — fixed position centered on image */}
						<button
							onClick={prev}
							aria-label="Previous slide"
							className="absolute top-1/2 -translate-y-1/2 left-1 sm:-left-4 z-20 h-11 w-11 flex items-center justify-center rounded-full bg-white text-navy-800 shadow-[0_4px_12px_rgba(10,27,51,0.1)] border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							onClick={next}
							aria-label="Next slide"
							className="absolute top-1/2 -translate-y-1/2 right-1 sm:-right-4 z-20 h-11 w-11 flex items-center justify-center rounded-full bg-white text-navy-800 shadow-[0_4px_12px_rgba(10,27,51,0.1)] border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

