"use client";

import Image from "next/image";
import { Play, Star } from "lucide-react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/cms";

// ─── Video Reviews ────────────────────────────────────────────────────────────

const videoReviews = [
	{
		name: "Senthil Kumar",
		title: "Sustained Wealth Growth via SIPs",
		duration: "1:42",
		thumbnail: "/images/gallery/unnamed (1)1.jpg",
	},
	{
		name: "Dr. Anjali R.",
		title: "Hassle-Free Health Claim Coordination",
		duration: "2:05",
		thumbnail: "/images/client-events/award 5.jpg",
	},
	{
		name: "M. Balaji",
		title: "LIC Retirement Planning Advisory",
		duration: "1:58",
		thumbnail: "/images/client-events/unnamed 1.jpg",
	},
];

// ─── Hardcoded fallback reviews ───────────────────────────────────────────────

const FALLBACK_REVIEWS = [
	{
		name: "Rajesh Kumar",
		role: "Retired Bank Employee",
		location: "Salem",
		rating: 5,
		time: "a month ago",
		text: `${company.name} explained my mutual fund options in simple Tamil and English both. No pressure, just honest guidance.`,
		initials: "RK",
		avatarBg: "bg-red-500",
	},
	{
		name: "Meena Sundaram",
		role: "School Teacher",
		location: "Salem",
		rating: 5,
		time: "3 weeks ago",
		text: "When my father was hospitalized, they personally coordinated with the insurance company. It made a hard time much easier.",
		initials: "MS",
		avatarBg: "bg-emerald-600",
	},
	{
		name: "Karthik R.",
		role: "Small Business Owner",
		location: "Namakkal",
		rating: 5,
		time: "2 months ago",
		text: `I have been with ${company.name} for my LIC policy and vehicle insurance for 6 years now. Always reliable.`,
		initials: "KR",
		avatarBg: "bg-blue-600",
	},
];

// ─── Google Rating Badge ──────────────────────────────────────────────────────

function GoogleRatingBadge() {
	return (
		<div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-xs">
			<div className="flex flex-col items-center select-none shrink-0 border-r border-neutral-200 pr-4">
				<span className="font-bold text-xl tracking-tight">
					<span className="text-blue-600">G</span>
					<span className="text-red-500">o</span>
					<span className="text-amber-500">o</span>
					<span className="text-blue-500">g</span>
					<span className="text-emerald-500">l</span>
					<span className="text-red-500">e</span>
				</span>
				<span className="text-[10px] font-bold text-neutral-400 mt-0.5 uppercase tracking-widest">Reviews</span>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center gap-1.5">
					<span className="text-3xl font-extrabold text-navy-900 leading-none">4.7</span>
					<div className="flex items-center">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
						))}
					</div>
				</div>
				<span className="text-xs text-neutral-500 mt-1 font-body">Based on 132+ Google Reviews</span>
			</div>
		</div>
	);
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeaderRow() {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-10 text-left">
			<div className="flex flex-col gap-2 max-w-xl">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600">CLIENT TESTIMONIALS</span>
				<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
				<p className="text-sm text-neutral-500 mt-1">Read verified feedback from families we support.</p>
			</div>
			<GoogleRatingBadge />
		</div>
	);
}

// ─── Exported Sections ────────────────────────────────────────────────────────

interface TestimonialsSectionProps {
	testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
	const hasCms = testimonials.length > 0;
	const colors = ["bg-red-500", "bg-emerald-600", "bg-blue-600", "bg-violet-600", "bg-amber-600"];

	return (
		<section className="py-20 md:py-28 bg-white border-b border-neutral-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
				<SectionHeaderRow />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
					{hasCms
						? testimonials.slice(0, 3).map((t, idx) => {
								const avatarBg = colors[idx % colors.length];
								const initials = t.customer_name
									.split(" ")
									.slice(0, 2)
									.map((n) => n[0])
									.join("")
									.toUpperCase();
								return (
									<Card key={t.id} variant="resting" hoverEffect className="flex flex-col justify-between p-6 border-neutral-200/80 rounded-2xl h-full">
										<div className="flex flex-col gap-3">
											<div className="flex items-center gap-0.5">
												{Array.from({ length: t.rating }).map((_, i) => (
													<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
												))}
											</div>
											<p className="text-sm leading-relaxed text-neutral-600 font-body font-light mt-1">
												&ldquo;{t.review}&rdquo;
											</p>
										</div>
										<div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-neutral-100">
											{t.photo_url ? (
												<Image src={t.photo_url} alt={t.customer_name} width={36} height={36} className="h-9 w-9 rounded-full object-cover shrink-0" />
											) : (
												<div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 select-none", avatarBg)}>
													{initials}
												</div>
											)}
											<div className="flex flex-col min-w-0 flex-1">
												<span className="font-semibold text-sm text-navy-900 truncate">{t.customer_name}</span>
												<span className="text-xs text-neutral-400 truncate mt-0.5 font-body">
													{[t.company, t.designation].filter(Boolean).join(" · ")}
												</span>
											</div>
										</div>
									</Card>
								);
						  })
						: FALLBACK_REVIEWS.map((review, idx) => (
								<Card key={idx} variant="resting" hoverEffect className="flex flex-col justify-between p-6 border-neutral-200/80 rounded-2xl h-full">
									<div className="flex flex-col gap-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-0.5">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
												))}
											</div>
											<span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">{review.time}</span>
										</div>
										<p className="text-sm leading-relaxed text-neutral-600 font-body font-light mt-1">&ldquo;{review.text}&rdquo;</p>
									</div>
									<div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-neutral-100">
										<div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 select-none", review.avatarBg)}>
											{review.initials}
										</div>
										<div className="flex flex-col min-w-0 flex-1">
											<span className="font-semibold text-sm text-navy-900 truncate">{review.name}</span>
											<span className="text-xs text-neutral-400 truncate mt-0.5 font-body">{review.location} &middot; {review.role}</span>
										</div>
										<span className="font-bold text-lg text-neutral-300 font-display select-none">G</span>
									</div>
								</Card>
						  ))}
				</div>

				<div className="flex justify-center mt-2">
					<a href={company.googleMaps.link} target="_blank" rel="noopener noreferrer">
						<Button variant="secondary" className="px-8 shadow-xs border-neutral-300 hover:border-neutral-400">
							Read All Google Reviews
						</Button>
					</a>
				</div>
			</div>
		</section>
	);
}

export function VideoTestimonialsSection() {
	return (
		<section className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600">VIDEO STORIES</span>
				<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Customers Say</h2>
				<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-8 font-body">
					Watch short video testimonials from clients sharing their long-term advisory experience.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-2">
					{videoReviews.map((video, idx) => (
						<Card key={idx} variant="resting" hoverEffect className="overflow-hidden p-0 border-neutral-200/80 rounded-2xl flex flex-col h-full group">
							<div className="relative w-full h-[210px] overflow-hidden bg-navy-950 border-b border-neutral-200 shrink-0">
								<Image src={video.thumbnail} alt={video.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" />
								<div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
									<button aria-label={`Play video review by ${video.name}`} className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 cursor-pointer">
										<Play className="h-6 w-6 fill-current ml-1" />
									</button>
								</div>
								<span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">{video.duration} Mins</span>
							</div>
							<div className="p-5 flex flex-col gap-1 flex-1 justify-center">
								<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Verified Client Video</span>
								<h3 className="font-display font-bold text-base text-navy-900 truncate mt-1">{video.title}</h3>
								<p className="text-xs text-neutral-500 font-body font-light mt-0.5">Shared by {video.name}</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
