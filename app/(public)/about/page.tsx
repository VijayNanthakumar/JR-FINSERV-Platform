"use client";


import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { ShieldCheck, Heart, Target } from "lucide-react";
import { company } from "@/config/company";

export default function AboutPage() {
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
						WHAT WE STAND FOR
					</span>
					<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
						Our Values
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
