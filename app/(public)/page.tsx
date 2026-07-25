import React from "react";
import { Card } from "@/components/common/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { HeroSlider } from "@/components/layout/HeroSlider";
import { ServicesGrid } from "@/components/layout/ServicesGrid";
import { FounderSection } from "@/components/layout/FounderSection";
import { Button } from "@/components/common/Button";
import {
	ShieldCheck,
	Users,
	Clock,
	HeartHandshake,
	Phone,
	Mail,
	MapPin,
	MessageSquare,
	Star,
	Play,
	Award,
	Navigation,
	TreePine,
	Eye,
	Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/config/company";
import Image from "next/image";
import {
	getActiveHeroSlides,
	getActiveGalleryImages,
	getActivePartners,
	getActiveTestimonials,
	groupPartnersByCategory,
} from "@/lib/cms-data";

export default async function HomePage() {
	// ─── Fetch CMS content directly from Supabase (server-side) ────────────────
	const [heroSlides, galleryImages, partners, testimonials] = await Promise.all([
		getActiveHeroSlides(),
		getActiveGalleryImages(),
		getActivePartners(),
		getActiveTestimonials(),
	]);

	// Group partners by category (preserves homepage layout)
	const partnerCategories = groupPartnersByCategory(partners);

	// Use first 3 gallery images for the office gallery section
	const officeGallery = galleryImages.slice(0, 3);

	// ─── Static data (not managed by CMS) ──────────────────────────────────────

	const whyChooseUs = [
		{
			title: "Honest, Unbiased Advice",
			description:
				"Unbiased recommendations chosen purely for your family's financial goals.",
			icon: ShieldCheck,
		},
		{
			title: "One Dedicated Advisor",
			description:
				"Direct personal support. No call centers, no confusion, always available.",
			icon: Users,
		},
		{
			title: "We Help With Claims Too",
			description:
				"Direct personal coordination with insurers from filing to final settlement.",
			icon: HeartHandshake,
		},
		{
			title: "Trusted Since 2007",
			description:
				"An LIC MDRT (USA) Member since 2007, serving 3,500+ families across Tamil Nadu and 24+ countries.",
			icon: Clock,
		},
	];

	// Customer video review placeholders (to be updated by owner later)
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

	// Community impact details
	const communityImpact = [
		{
			title: "Blood Donation Camps",
			value: "700+",
			label: "Blood Units Collected",
			desc: "Organizing periodic drives supporting local government hospitals.",
			icon: Activity,
			color: "text-red-500 bg-red-50",
		},
		{
			title: "Tree Plantations",
			value: "2,650+",
			label: "Saplings Planted",
			desc: "Eco-initiatives focused on reforestation in Komarapalayam and Namakkal.",
			icon: TreePine,
			color: "text-emerald-600 bg-emerald-50",
		},
		{
			title: "Eye Donation Pledges",
			value: "90+",
			label: "Pledges Secured",
			desc: "Securing eye donation commitments in collaboration with local eye banks.",
			icon: Eye,
			color: "text-blue-600 bg-blue-50",
		},
		{
			title: "Lions Club Leadership",
			value: "Active",
			label: "Community Welfare",
			desc: "Ln. V. Janarthanam directing local social relief and youth literacy projects.",
			icon: Award,
			color: "text-amber-600 bg-amber-50",
		},
	];

	const primaryContacts = [
		{
			title: "Call Us",
			value: company.phone.display,
			href: company.phone.href,
			icon: Phone,
			description: company.officeHours.short,
		},
		{
			title: "WhatsApp Us",
			value: company.whatsapp.display,
			href: company.whatsapp.href,
			icon: MessageSquare,
			description: "Instant support chat",
		},
	];

	const secondaryContacts = [
		{ title: "Email Us", value: company.email.display, href: company.email.href, icon: Mail },
		{
			title: "Visit Our Office",
			value: company.address.short,
			href: undefined,
			icon: MapPin,
		},
	];

	// ─── Fallback gallery images if CMS is empty ────────────────────────────────
	const staticGallery = [
		{ src: "/images/office-team/unnamed.jpg", caption: "Office Exterior", alt: "Office Front View" },
		{ src: "/images/gallery/sg.jpg", caption: "Reception Desk", alt: "Reception Area" },
		{ src: "/images/gallery/unnamed (1)1.jpg", caption: "Meeting Room", alt: "Client Meeting Room" },
	];
	const displayGallery =
		officeGallery.length > 0
			? officeGallery.map((img) => ({
					src: img.image_url,
					caption: img.caption ?? "Office",
					alt: img.alt_text ?? img.caption ?? "Office photo",
			  }))
			: staticGallery;

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
			<section id="services" className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">OUR SERVICES</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">How We Can Help You</h2>
					<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-8 font-body">
						Simple, honest advice on savings and protection — chosen to match your family&apos;s needs.
					</p>
					<ServicesGrid />
				</div>
			</section>

			{/* 4. Why Choose Us */}
			<section className="py-20 md:py-28 bg-white border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">WHY CHOOSE US</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
						Why Families Trust {company.name}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-8">
						{whyChooseUs.map((item, index) => (
							<Card
								key={item.title}
								variant="resting"
								hoverEffect
								animateReveal
								delay={index * 0.05}
								className="flex flex-col gap-4 border-neutral-200/60 p-6 md:p-6"
							>
								<div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 border border-blue-100/20">
									<item.icon className="h-5 w-5" />
								</div>
								<div className="flex flex-col gap-1.5">
									<h3 className="font-display font-bold text-base text-navy-900">{item.title}</h3>
									<p className="text-xs leading-relaxed text-neutral-500 font-body font-light">{item.description}</p>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* 5. Meet Our Founder */}
			<FounderSection />

			{/* 6. Testimonials — live from CMS */}
			{testimonials.length > 0 && (
				<section className="py-20 md:py-28 bg-white border-b border-neutral-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
						{/* Header */}
						<div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-10 text-left">
							<div className="flex flex-col gap-2 max-w-xl">
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">CLIENT TESTIMONIALS</span>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
								<p className="text-sm text-neutral-500 mt-1">Read verified feedback from families we support.</p>
							</div>
							{/* Google Rating Badge */}
							<div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-xs">
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
									<span className="text-xs text-neutral-500 mt-1 font-body">Based on 132+ Google Reviews</span>
								</div>
							</div>
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

			{/* 6b. Fallback testimonial section (hardcoded) when CMS is empty */}
			{testimonials.length === 0 && (
				<section className="py-20 md:py-28 bg-white border-b border-neutral-200">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
						<div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-10 text-left">
							<div className="flex flex-col gap-2 max-w-xl">
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">CLIENT TESTIMONIALS</span>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Clients Say</h2>
								<p className="text-sm text-neutral-500 mt-1">Read verified Google Business Profile ratings and feedback from families we support.</p>
							</div>
							<div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-2xl px-6 py-5 shadow-xs">
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
									<span className="text-xs text-neutral-500 mt-1 font-body">Based on 132+ Google Reviews</span>
								</div>
							</div>
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

			{/* 7. Video Testimonials Section */}
			<section className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">VIDEO STORIES</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">What Our Customers Say</h2>
					<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-8 font-body">
						Watch short video testimonials from clients sharing their long-term advisory experience.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-2">
						{videoReviews.map((video, idx) => (
							<Card
								key={idx}
								variant="resting"
								hoverEffect
								className="overflow-hidden p-0 border-neutral-200/80 rounded-2xl flex flex-col justify-between h-full group"
							>
								<div className="relative w-full h-[210px] overflow-hidden bg-navy-950 border-b border-neutral-200 shrink-0">
									<Image
										src={video.thumbnail}
										alt={video.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
									/>
									<div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
										<button
											aria-label={`Play video review by ${video.name}`}
											className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 cursor-pointer"
										>
											<Play className="h-6 w-6 fill-current ml-1" />
										</button>
									</div>
									<span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
										{video.duration} Mins
									</span>
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

			{/* 8. Partners — live from CMS (grouped by category) */}
			<section className="py-20 md:py-28 bg-white border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">OUR EMPANELMENTS</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">Corporate Partners &amp; Empanelments</h2>
					<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-10 font-body">
						Empanelled with leading financial institutions and insurers to provide comprehensive advisory support.
					</p>

					{/* CMS partners (grouped by category) */}
					{partnerCategories.length > 0 ? (
						<div className="flex flex-col gap-10">
							{partnerCategories.map((category) => (
								<div key={category.name} className="flex flex-col gap-4 border border-neutral-200/60 rounded-3xl p-6 md:p-8 bg-neutral-50/50">
									<h3 className="font-display font-semibold text-sm text-neutral-500 uppercase tracking-widest text-left pl-2 border-l-2 border-blue-600">
										{category.name}
									</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center mt-2">
										{category.logos.map((logo) => (
											<div
												key={logo.name}
												className="flex items-center justify-center p-4 min-h-[88px] w-full rounded-2xl border border-neutral-100 bg-white shadow-xs hover:shadow-md transition-shadow"
											>
												<Image
													src={logo.src}
													alt={logo.name}
													width={120}
													height={44}
													className="object-contain max-h-12 w-auto max-w-full"
												/>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						/* Fallback: hardcoded partners when CMS is empty */
						<div className="flex flex-col gap-10">
							{[
								{ name: "Mutual Funds", logos: [{ name: "Nippon India Mutual Fund", src: "/images/partner-logos/nippon.jpg" }, { name: "SBI Mutual Fund", src: "/images/partner-logos/sbi.jpg" }, { name: "ICICI Prudential Mutual Fund", src: "/images/partner-logos/icici.jpg" }, { name: "Mahindra Manulife Mutual Fund", src: "/images/partner-logos/mahindra.png" }, { name: "Motilal Oswal Mutual Fund", src: "/images/partner-logos/motilal.jpg" }, { name: "Aditya Birla Sun Life Mutual Fund", src: "/images/partner-logos/abs.jpg" }] },
								{ name: "Life Insurance", logos: [{ name: "LIC", src: "/images/partner-logos/lic.png" }] },
								{ name: "Health Insurance", logos: [{ name: "Star Health Insurance", src: "/images/partner-logos/star-health.jpg" }] },
								{ name: "General & Vehicle Insurance", logos: [{ name: "Chola MS General Insurance", src: "/images/partner-logos/chola.jpg" }, { name: "National Insurance", src: "/images/partner-logos/national.jpg" }] },
							].map((category) => (
								<div key={category.name} className="flex flex-col gap-4 border border-neutral-200/60 rounded-3xl p-6 md:p-8 bg-neutral-50/50">
									<h3 className="font-display font-semibold text-sm text-neutral-500 uppercase tracking-widest text-left pl-2 border-l-2 border-blue-600">{category.name}</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center mt-2">
										{category.logos.map((logo) => (
											<div key={logo.name} className="flex items-center justify-center p-4 min-h-[88px] w-full rounded-2xl border border-neutral-100 bg-white shadow-xs hover:shadow-md transition-shadow">
												<Image src={logo.src} alt={logo.name} width={120} height={44} className="object-contain max-h-12 w-auto max-w-full" />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			{/* 9. Community Impact Section */}
			<section className="py-20 md:py-28 bg-neutral-50 border-b border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">COMMUNITY IMPACT</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">Serving Society Beyond Finance</h2>
					<p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-10 font-body">
						Social welfare initiatives, tree plantations, and health drives conducted by our Lions Club leadership.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
						{communityImpact.map((item) => (
							<Card key={item.title} variant="resting" hoverEffect className="flex flex-col gap-4 border-neutral-200/60 p-6 shadow-sm bg-white">
								<div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-neutral-100/10", item.color)}>
									<item.icon className="h-5 w-5" />
								</div>
								<div className="flex flex-col gap-1">
									<span className="text-3xl font-extrabold text-navy-900 leading-none">{item.value}</span>
									<span className="text-xs font-bold text-neutral-400 mt-1.5 uppercase tracking-wider font-body">{item.label}</span>
									<h3 className="font-display font-semibold text-sm text-neutral-800 leading-snug mt-2">{item.title}</h3>
									<p className="text-xs leading-relaxed text-neutral-500 font-body font-light mt-1">{item.desc}</p>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* 10. Office Gallery & Contact Us Section */}
			<section id="contact" className="py-20 md:py-28 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
					{/* Contact split layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
						{/* Left: Contact + Location details */}
						<div className="lg:col-span-5 flex flex-col gap-8">
							<div className="flex flex-col gap-4 text-left">
								<span className="text-xs font-bold uppercase tracking-widest text-blue-600">GET IN TOUCH</span>
								<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
									Let&apos;s Talk About Your Family&apos;s Future
								</h2>
								<p className="text-sm md:text-base text-neutral-500 leading-relaxed font-body">
									Call us, WhatsApp us, or visit our office &mdash; whichever is easiest for you.
								</p>
							</div>

							{/* Primary Contacts */}
							<div className="flex flex-col gap-4">
								{primaryContacts.map((method) => (
									<a
										key={method.title}
										href={method.href}
										target={method.href.startsWith("http") ? "_blank" : undefined}
										rel="noopener noreferrer"
										className="group"
									>
										<div
											className={cn(
												"flex items-center gap-5 border rounded-2xl p-5 md:p-6 transition-all duration-300 shadow-sm",
												method.title.includes("WhatsApp")
													? "bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/70 hover:shadow-md"
													: "bg-blue-50/40 border-blue-200/80 hover:border-blue-500/50 hover:bg-blue-50/70 hover:shadow-md"
											)}
										>
											<div
												className={cn(
													"h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border shadow-xs transition-transform duration-300 group-hover:scale-105",
													method.title.includes("WhatsApp")
														? "bg-emerald-500 text-white border-emerald-600/20"
														: "bg-blue-700 text-white border-blue-800/20"
												)}
											>
												<method.icon className="h-5 w-5" />
											</div>
											<div className="flex flex-col min-w-0">
												<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{method.title}</span>
												<span className="text-lg md:text-xl font-bold text-navy-900 mt-0.5">{method.value}</span>
												<span className="text-xs text-neutral-500 mt-0.5 font-body font-light">{method.description}</span>
											</div>
										</div>
									</a>
								))}
							</div>

							{/* Secondary Contacts */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{secondaryContacts.map((method) => {
									const content = (
										<div
											className="flex items-center gap-4 bg-white border border-neutral-200/80 rounded-2xl p-4 hover:border-neutral-300 hover:shadow-xs transition-all h-full"
										>
											<div className="h-9 w-9 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600 shrink-0 border border-neutral-100">
												<method.icon className="h-4.5 w-4.5" />
											</div>
											<div className="flex flex-col min-w-0">
												<span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{method.title}</span>
												<span className="text-xs font-semibold text-neutral-800 truncate mt-0.5 font-body">{method.value}</span>
											</div>
										</div>
									);
									return method.href ? (
										<a key={method.title} href={method.href} className="group">{content}</a>
									) : (
										<div key={method.title}>{content}</div>
									);
								})}
							</div>
						</div>

						{/* Right: Contact Form */}
						<div className="lg:col-span-7">
							<ContactForm />
						</div>
					</div>

					{/* Office Gallery & Directions */}
					<div className="flex flex-col gap-6 border-t border-neutral-100 pt-12 text-left">
						<div className="flex flex-col gap-2">
							<span className="text-xs font-bold uppercase tracking-widest text-blue-600">OFFICE PRESENCE</span>
							<h3 className="font-display font-bold text-2xl text-navy-900">Our Advisory Office Presence</h3>
							<p className="text-sm text-neutral-500">Visit us in Komarapalayam during standard business hours.</p>
						</div>

						{/* Photo Gallery Grid — CMS or fallback */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
							{displayGallery.map((photo, idx) => (
								<div key={idx} className="relative h-[200px] rounded-2xl overflow-hidden border border-neutral-200 shadow-xs group">
									<Image
										src={photo.src}
										alt={photo.alt}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-103"
									/>
									<div className="absolute inset-0 bg-black/10 flex items-end p-4">
										<span className="text-white text-xs font-bold bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg">
											{photo.caption}
										</span>
									</div>
								</div>
							))}
						</div>

						{/* Map Location */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
							<div className="lg:col-span-8 relative overflow-hidden h-[300px] w-full rounded-2xl border border-neutral-200 shadow-md">
								<iframe
									title={`${company.name} office location map`}
									src={company.googleMaps.embedUrl}
									className="absolute inset-0 w-full h-full border-0"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
							<div className="lg:col-span-4 flex flex-col gap-4 text-left">
								<h4 className="font-semibold text-navy-900 text-sm uppercase tracking-wider">Komarapalayam Head Office</h4>
								<p className="text-xs text-neutral-500 leading-relaxed font-body">{company.address.full}</p>
								<a
									href={company.googleMaps.link}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2"
								>
									<Button variant="primary-gradient" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-6">
										<Navigation className="h-4 w-4 shrink-0" />
										Get Directions
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}