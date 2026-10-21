import { Card } from "@/components/common/Card";
import { HeroSlider } from "@/components/layout/HeroSlider";
import { ServicesGrid } from "@/components/layout/ServicesGrid";

export const revalidate = 0;
import { FounderSection } from "@/components/layout/FounderSection";
import { ContactConsultationSection } from "@/components/common/ContactConsultationSection";
import { Button } from "@/components/common/Button";
import {
	Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/config/company";
import Image from "next/image";
import { YouTubeVideoSection } from "@/components/common/YouTubeVideoSection";
import { NoticeSection } from "@/components/common/NoticeSection";
import { InvestorPortalSection } from "@/components/common/InvestorPortalSection";
import { SocialMediaSection } from "@/components/common/SocialMediaSection";
import {
	getActiveHeroSlides,
	getActiveYouTubeVideos,
	getActiveTestimonials,
	getActiveNotices,
} from "@/lib/cms-data";

export default async function HomePage() {
	// ─── Fetch CMS content directly from Supabase (server-side) ────────────────
	const [heroSlides, homepageVideos, testimonials, homepageNotices] = await Promise.all([
		getActiveHeroSlides(),
		getActiveYouTubeVideos("Homepage"),
		getActiveTestimonials(),
		getActiveNotices("Homepage"),
	]);

	// ─── Static data (not managed by CMS) ──────────────────────────────────────



	return (
		<div className="flex flex-col w-full overflow-hidden">
			{/* 1. Hero */}
			<HeroSlider slides={heroSlides} />

			{/* 2. Trust Strip */}
			<section className="bg-navy-900 py-6 border-b border-navy-800 text-white select-none">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center">
						<div className="flex flex-col items-center gap-1 border-r border-white/10 last:border-0 md:border-r-0 lg:border-r">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">AMFI Status</span>
							<span className="text-sm font-semibold">Registered Distributor</span>
						</div>
						<div className="flex flex-col items-center gap-1 border-r border-white/10 last:border-0 md:border-r-0 lg:border-r">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Recognition</span>
							<span className="text-sm font-semibold">LIC MDRT (USA)</span>
						</div>
						<div className="flex flex-col items-center gap-1 border-r border-white/10 last:border-0 md:border-r-0 lg:border-r">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Partnership</span>
							<span className="text-sm font-semibold">Star Health Elite Advisor</span>
						</div>
						<div className="flex flex-col items-center gap-1 border-r border-white/10 last:border-0 md:border-r-0 lg:border-r">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Google Rating</span>
							<span className="text-sm font-semibold flex items-center gap-1">
								4.7 <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
							</span>
						</div>
						<div className="flex flex-col items-center gap-1 border-r border-white/10 last:border-0 md:border-r-0 lg:border-r">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Guided Reach</span>
							<span className="text-sm font-semibold">3,500+ Families</span>
						</div>
						<div className="flex flex-col items-center gap-1 last:border-0">
							<span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Global Presence</span>
							<span className="text-sm font-semibold">24+ Countries</span>
						</div>
					</div>
				</div>
			</section>

			{/* 3. Our Services */}
			<section id="services" className="py-12 sm:py-16 md:py-28 bg-neutral-50 border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">OUR SERVICES</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">How We Can Help You</h2>
					<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-8 font-body">
						Simple, honest advice on savings and protection — chosen to match your family&apos;s needs.
					</p>
					<ServicesGrid />
				</div>
			</section>

			{/* 5. Meet Our Founder */}
			<FounderSection />

			{/* 6. Testimonials — live from CMS */}
			{testimonials.length > 0 && (
				<section className="py-12 sm:py-16 md:py-28 bg-white border-b border-neutral-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
						{/* Header */}
						<div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-10 text-left">
							<div className="flex flex-col gap-2 max-w-xl">
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">CLIENT TESTIMONIALS</span>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
								<p className="text-sm text-neutral-500 mt-1">Read verified feedback from families we support.</p>
							</div>
							{/* Google Rating Badge — clickable */}
							<a
								href="https://g.page/r/CX6ImnTtz0p9EBM/review"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View JR FINSERV on Google Reviews"
								className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-xs hover:shadow-md hover:border-neutral-300 hover:bg-white transition-all duration-200 cursor-pointer group"
							>
								<div className="flex flex-col items-center select-none shrink-0 border-r border-neutral-200 pr-4">
									<span className="font-bold text-xl tracking-tight text-blue-600">
										G<span className="text-red-500">o</span><span className="text-amber-500">o</span><span className="text-blue-500">g</span><span className="text-emerald-500">l</span><span className="text-red-500">e</span>
									</span>
									<span className="text-[10px] font-bold text-neutral-400 mt-0.5 uppercase tracking-widest">Reviews</span>
								</div>
								<div className="flex flex-col">
									<div className="flex items-center gap-1.5">
										<span className="text-3xl font-extrabold text-navy-900 leading-none">4.7</span>
										<div className="flex items-center">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
											))}
										</div>
									</div>
									<span className="text-xs text-neutral-500 mt-1 font-body group-hover:text-blue-600 transition-colors">Based on 132+ Google Reviews</span>
								</div>
							</a>
						</div>

						{/* Testimonial cards */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
							{testimonials.slice(0, 3).map((t, idx) => {
								// Generate a consistent avatar color from name
								const colors = ["bg-red-500", "bg-emerald-600", "bg-blue-600", "bg-violet-600", "bg-amber-600"];
								const avatarBg = colors[idx % colors.length];
								const initials = t.customer_name
									.split(" ")
									.slice(0, 2)
									.map((n) => n[0])
									.join("")
									.toUpperCase();

								return (
									<Card
										key={t.id}
										variant="resting"
										hoverEffect
										className="flex flex-col justify-between p-6 border-neutral-200/80 rounded-2xl relative h-full group transition-all"
									>
										<div className="flex flex-col gap-3">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-0.5">
													{Array.from({ length: t.rating }).map((_, i) => (
														<Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
													))}
												</div>
											</div>
											<p className="text-sm leading-relaxed text-neutral-600 font-body font-light mt-1">
												&ldquo;{t.review}&rdquo;
											</p>
										</div>
										<div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-neutral-100">
											{t.photo_url ? (
												<Image
													src={t.photo_url}
													alt={t.customer_name}
													width={36}
													height={36}
													className="h-9 w-9 rounded-full object-cover shrink-0"
												/>
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
							})}
						</div>

						{/* Review CTA bar */}
						<a
							href="https://g.page/r/CX6ImnTtz0p9EBM/review"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Write a Google Review for JR FINSERV"
							className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group text-left"
						>
							{/* Left: text */}
							<div className="flex items-center gap-4 flex-1 min-w-0">
								<div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
									<Star className="h-5 w-5 fill-amber-400 text-amber-400" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="font-display font-bold text-sm md:text-base text-navy-900">Had a Good Experience with JR FINSERV?</span>
									<span className="text-xs text-neutral-500 font-body">Share your experience on Google.</span>
								</div>
							</div>
							{/* Right: button-styled portion of the same link */}
							<span className="inline-flex items-center gap-2 bg-blue-700 group-hover:bg-blue-600 text-white font-semibold text-sm rounded-xl px-4 py-2.5 transition-all shadow-sm whitespace-nowrap">
								⭐ Write a Google Review ↗
							</span>
						</a>
					</div>
				</section>
			)}

			{/* 6b. Fallback testimonial section (hardcoded) when CMS is empty */}
			{testimonials.length === 0 && (
				<section className="py-12 sm:py-16 md:py-28 bg-white border-b border-neutral-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
						<div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-10 text-left">
							<div className="flex flex-col gap-2 max-w-xl">
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">CLIENT TESTIMONIALS</span>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
								<p className="text-sm text-neutral-500 mt-1">Read verified Google Business Profile ratings and feedback from families we support.</p>
							</div>
							{/* Google Rating Badge — clickable */}
							<a
								href="https://g.page/r/CX6ImnTtz0p9EBM/review"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View JR FINSERV on Google Reviews"
								className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-xs hover:shadow-md hover:border-neutral-300 hover:bg-white transition-all duration-200 cursor-pointer group"
							>
								<div className="flex flex-col items-center select-none shrink-0 border-r border-neutral-200 pr-4">
									<span className="font-bold text-xl tracking-tight text-blue-600">
										G<span className="text-red-500">o</span><span className="text-amber-500">o</span><span className="text-blue-500">g</span><span className="text-emerald-500">l</span><span className="text-red-500">e</span>
									</span>
									<span className="text-[10px] font-bold text-neutral-400 mt-0.5 uppercase tracking-widest">Reviews</span>
								</div>
								<div className="flex flex-col">
									<div className="flex items-center gap-1.5">
										<span className="text-3xl font-extrabold text-navy-900 leading-none">4.7</span>
										<div className="flex items-center">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
											))}
										</div>
									</div>
									<span className="text-xs text-neutral-500 mt-1 font-body group-hover:text-blue-600 transition-colors">Based on 132+ Google Reviews</span>
								</div>
							</a>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
							{[
								{ name: "Rajesh Kumar", role: "Retired Bank Employee", location: "Salem", rating: 5, time: "a month ago", text: `${company.name} explained my mutual fund options in simple Tamil and English both. No pressure, just honest guidance.`, initials: "RK", avatarBg: "bg-red-500" },
								{ name: "Meena Sundaram", role: "School Teacher", location: "Salem", rating: 5, time: "3 weeks ago", text: "When my father was hospitalized, they personally coordinated with the insurance company. It made a hard time much easier.", initials: "MS", avatarBg: "bg-emerald-600" },
								{ name: "Karthik R.", role: "Small Business Owner", location: "Namakkal", rating: 5, time: "2 months ago", text: `I have been with ${company.name} for my LIC policy and vehicle insurance for 6 years now. Always reliable.`, initials: "KR", avatarBg: "bg-blue-600" },
							].map((review, idx) => (
								<Card key={idx} variant="resting" hoverEffect className="flex flex-col justify-between p-6 border-neutral-200/80 rounded-2xl relative h-full group transition-all">
									<div className="flex flex-col gap-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-0.5">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
												))}
											</div>
											<span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">{review.time}</span>
										</div>
										<p className="text-sm leading-relaxed text-neutral-600 font-body font-light mt-1">&ldquo;{review.text}&rdquo;</p>
									</div>
									<div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-neutral-100">
										<div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 select-none", review.avatarBg)}>{review.initials}</div>
										<div className="flex flex-col min-w-0 flex-1">
											<span className="font-semibold text-sm text-navy-900 truncate">{review.name}</span>
											<span className="text-xs text-neutral-400 truncate mt-0.5 font-body">{review.location} &middot; {review.role}</span>
										</div>
										<span className="font-bold text-lg text-neutral-300 font-display select-none">G</span>
									</div>
								</Card>
							))}
						</div>
						<a
							href="https://g.page/r/CX6ImnTtz0p9EBM/review"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Write a Google Review for JR FINSERV"
							className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group text-left"
						>
							<div className="flex items-center gap-4 flex-1 min-w-0">
								<div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
									<Star className="h-5 w-5 fill-amber-400 text-amber-400" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="font-display font-bold text-sm md:text-base text-navy-900">Had a Good Experience with JR FINSERV?</span>
									<span className="text-xs text-neutral-500 font-body">Share your experience on Google.</span>
								</div>
							</div>
							<span className="inline-flex items-center gap-2 bg-blue-700 group-hover:bg-blue-600 text-white font-semibold text-sm rounded-xl px-4 py-2.5 transition-all shadow-sm whitespace-nowrap">
								⭐ Write a Google Review ↗
							</span>
						</a>
						<div className="flex justify-center mt-2">
							<a href={company.googleMaps.link} target="_blank" rel="noopener noreferrer">
								<Button variant="secondary" className="px-8 shadow-xs border-neutral-300 hover:border-neutral-400">
									Read All Google Reviews
								</Button>
							</a>
						</div>
					</div>
				</section>
			)}

			{/* 7. Video Stories Section — loaded dynamically from Supabase (youtube_videos) */}
			<YouTubeVideoSection videos={homepageVideos} />

			{/* 7b. Notices — promotional posters from CMS */}
			<NoticeSection notices={homepageNotices} bgClassName="bg-neutral-50 border-b border-neutral-200" />

			{/* 8. Investor Portal */}
			<InvestorPortalSection />

			{/* 9. Contact Us Section */}
			<ContactConsultationSection />

			{/* 10. Social Media */}
			<SocialMediaSection />
		</div>
	);
}