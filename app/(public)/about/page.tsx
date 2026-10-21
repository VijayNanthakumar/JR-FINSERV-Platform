import Link from "next/link";
import Image from "next/image";
import { PageBanner } from "@/components/common/PageBanner";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { ShieldCheck, Heart, Target, Activity, TreePine, Eye, Award } from "lucide-react";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import { getActivePartners, groupPartnersByCategory } from "@/lib/cms-data";

export const revalidate = 0;

export default async function AboutPage() {
	const breadcrumbItems = [{ name: "About Us" }];

	const coreValues = [
		{
			title: "Transparency First",
			description: "We explain every cost and commission upfront. No fine print, no surprises.",
			icon: ShieldCheck,
		},
		{
			title: "No Pressure Sales",
			description: "We advise honestly and let you decide. We never push products you don't need.",
			icon: Target,
		},
		{
			title: "We Stand By You",
			description: "If you ever need to file a claim, we personally help you through the process.",
			icon: Heart,
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

	// Fetch CMS partners data (same as homepage)
	const partners = await getActivePartners();
	const partnerCategories = groupPartnersByCategory(partners);

	return (
		<div className="flex flex-col w-full">
			<PageBanner
				title={`About ${company.name}`}
				description="A trusted financial advisory serving families across Tamil Nadu and 24+ countries."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Our Story — short, plain language */}
			<section className="py-20 md:py-28 bg-white">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
						OUR STORY
					</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
						Simple, Honest Financial Advice Since 2007
					</h2>
					<p className="text-base text-neutral-600 leading-relaxed">
						{company.name} was founded by Ln. V. Janarthanam, CIP, an LIC MDRT (USA) Member since 2007,
						with one goal: to help everyday families make sense of mutual funds and insurance without
						confusing terms or pushy sales tactics. Today, that goal hasn&apos;t changed — we serve
						3,500+ happy customers across Tamil Nadu and 24+ countries, sitting down with every
						client, explaining things plainly, and recommending only what genuinely helps them.
					</p>
				</div>
			</section>

			{/* Our Values */}
			<section className="py-20 md:py-28 bg-neutral-50 border-y border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
						THE JR FINSERV DIFFERENCE
					</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
						Your Financial Well-Being, Our Priority
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-6">
						{coreValues.map((val, idx) => (
							<Card
								key={idx}
								variant="resting"
								hoverEffect
								className="flex flex-col gap-4 border-neutral-100"
							>
								<div className="h-11 w-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
									<val.icon className="h-5 w-5" />
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="font-semibold text-base text-neutral-800">
										{val.title}
									</h3>
									<p className="text-sm text-neutral-500 leading-relaxed">
										{val.description}
									</p>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Licenses — simple trust line, not a table */}
			<section className="py-16 bg-white border-b border-neutral-200">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-3">
					<h3 className="font-display text-xl font-bold text-navy-900">
						Licensed &amp; Regulated
					</h3>
					<p className="text-sm text-neutral-500">
						AMFI Registered Mutual Fund Distributor &middot; LIC MDRT (USA) Member Since 2007
					</p>
				</div>
			</section>

			{/* Corporate Partners & Empanelments */}
			<section className="py-12 sm:py-16 md:py-28 bg-white border-b border-neutral-200">
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
								{ name: "Life Insurance", logos: [{ name: "LIC", src: "/images/partner-logos/lic.webp" }] },
								{ name: "Health Insurance", logos: [{ name: "Star Health Insurance", src: "/images/partner-logos/star-health.webp" }] },
								{ name: "General & Vehicle Insurance", logos: [{ name: "Chola MS General Insurance", src: "/images/partner-logos/chola.webp" }, { name: "National Insurance", src: "/images/partner-logos/national.webp" }] },
								{ name: "Mutual Funds", logos: [{ name: "Nippon India Mutual Fund", src: "/images/partner-logos/nippon.webp" }, { name: "SBI Mutual Fund", src: "/images/partner-logos/sbi.webp" }, { name: "ICICI Prudential Mutual Fund", src: "/images/partner-logos/icici.webp" }, { name: "Mahindra Manulife Mutual Fund", src: "/images/partner-logos/mahindra.webp" }, { name: "Motilal Oswal Mutual Fund", src: "/images/partner-logos/motilal.webp" }, { name: "Aditya Birla Sun Life Mutual Fund", src: "/images/partner-logos/abs.webp" }] },
							].map((category) => (
								<div key={category.name} className="flex flex-col gap-4 border border-neutral-200/60 rounded-3xl p-6 md:p-8 bg-neutral-50/50">
									<h3 className="font-display font-semibold text-sm text-neutral-500 uppercase tracking-widest text-left pl-2 border-l-2 border-blue-600">{category.name}</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center mt-2">
										{category.logos.map((logo) => (
											<div key={logo.name} className="flex items-center justify-center p-4 min-h-[88px] w-full rounded-2xl border border-neutral-100 bg-white shadow-xs hover:shadow-md transition-shadow">
												<Image src={logo.src} alt={logo.name} width={120} height={44} loading="lazy" className="object-contain max-h-12 w-auto max-w-full" />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Community Impact Section */}
			<section className="py-12 sm:py-16 md:py-28 bg-neutral-50 border-b border-neutral-200">
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

			{/* Final CTA */}
			<section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-blue-800 text-white text-center">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
					<h2 className="font-display text-3xl font-bold">
						Have a Question for Us?
					</h2>
					<p className="text-sm text-neutral-300 max-w-lg leading-relaxed">
						Talk to our founder or one of our advisors — no obligation, just honest guidance.
					</p>
					<Link href="/contact#consultation">
						<Button variant="primary-gradient" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400">
							Contact Us
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
