"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/common/Button";
import { Star, Heart } from "lucide-react";
import { company } from "@/config/company";

const testimonialsList = [
	{
		name: "Rajesh Sharma",
		location: "Coimbatore",
		role: "Senior IT Consultant",
		rating: 5,
		quote: `${company.name} completely reorganized my family's mutual fund portfolio. Their unbiased advising approach saved us from high-commission funds and set a clear path for retirement.`,
		serviceTag: "Mutual Funds",
	},
	{
		name: "Meera Nair",
		location: "Chennai",
		role: "Tech Lead",
		rating: 5,
		quote: `The claims team at ${company.name} was outstanding when my father was hospitalized. They coordinated directly with the health insurance company, letting us focus on his recovery.`,
		serviceTag: "Star Health Insurance",
	},
	{
		name: "Aman Preet",
		location: "Erode",
		role: "Business Owner",
		rating: 5,
		quote: `Our manufacturing company secured group medical policies through ${company.name}. Their advisors explained room rent caps and co-pays in plain language. Highly recommend their corporate desks.`,
		serviceTag: "Star Health Insurance",
	},
	{
		name: "Sanjay Deshmukh",
		location: "Salem",
		role: "Retired Bank Manager",
		rating: 5,
		quote: `Managing my LIC pension policies was becoming difficult until I worked with ${company.name}. They audited my premium schedules and set up clean reminders. Excellent offline claim assistance.`,
		serviceTag: "LIC",
	},
	{
		name: "Kavitha Krishnan",
		location: "Chennai",
		role: "Chartered Accountant",
		rating: 4,
		quote: `As a financial professional myself, I am very picky about advisor integrity. ${company.name} lists expense ratios and commission margins upfront. Their transparency is refreshing.`,
		serviceTag: "Mutual Funds",
	},
	{
		name: "Vikram Malhotra",
		location: "Namakkal",
		role: "Logistics Manager",
		rating: 5,
		quote: `I secure both my commercial trucks and private SUV policies through ${company.name}. Claim coordinates are handled seamlessly. Zero hassle during cashless repairs.`,
		serviceTag: "General Insurance",
	},
];

export default function TestimonialsPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const breadcrumbItems = [{ name: "Testimonials" }];

	const categories = [
		{ id: "all", label: "All Reviews" },
		{ id: "Life Insurance", label: "Life Insurance (LIC)" },
		{ id: "Star Health Insurance", label: "Star Health Insurance" },
		{ id: "General Insurance", label: "General Insurance" },
		{ id: "Mutual Funds", label: "Mutual Funds" },
	];

	// Filter
	const filteredTestimonials = testimonialsList.filter((test) => {
		if (activeCategory === "all") return true;
		return test.serviceTag === activeCategory;
	});

	return (
		<div className="flex flex-col w-full">
			{/* Page Banner */}
			<PageBanner
				title="Client Reviews &amp; Testimonials"
				description={`Hear directly from families, retirees, and corporate owners who trust ${company.name} with their capital.`}
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Trust Summary Band */}
			<section className="py-12 bg-white dark:bg-navy-950 border-b border-neutral-150 dark:border-navy-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-4 text-left">
						<div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center text-amber-500 shrink-0">
							<Star className="h-6 w-6 fill-current" />
						</div>
						<div>
							<h3 className="font-display font-bold text-xl text-neutral-800 dark:text-white">
								4.8 / 5 Rating
							</h3>
							<p className="text-xs text-neutral-500 dark:text-neutral-450 mt-0.5">
								Aggregate score calculated across 2,400+ verified client audit surveys.
							</p>
						</div>
					</div>
					
					{/* Category selection */}
					<div className="flex flex-wrap gap-2 overflow-x-auto py-1 max-w-full">
						{categories.map((cat) => (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`h-9 px-4 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
									activeCategory === cat.id
										? "bg-blue-600 border-blue-600 text-white shadow-xs"
										: "bg-neutral-50 dark:bg-navy-900 border-neutral-200 dark:border-navy-750 text-neutral-600 dark:text-neutral-300 hover:border-blue-600/30"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Reviews Grid */}
			<section className="py-20 md:py-28 bg-neutral-50 dark:bg-navy-900/40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left items-stretch">
						{filteredTestimonials.map((test, index) => (
							<TestimonialCard key={index} {...test} delay={index * 0.05} />
						))}
					</div>

					{filteredTestimonials.length === 0 && (
						<div className="py-16 text-center">
							<p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
								No reviews match this filter yet.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Lead Capture CTA */}
			<section className="py-16 md:py-24 bg-white dark:bg-navy-950 border-t border-neutral-200 dark:border-navy-900">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
					<div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
						<Heart className="h-6 w-6" />
					</div>
					<h3 className="font-display font-bold text-2xl text-navy-900 dark:text-white">
						Experience Quiet Confidence in Financial Advisory
					</h3>
					<p className="text-sm text-neutral-500 dark:text-neutral-450 max-w-lg leading-relaxed font-body">
						Secure your family coverage and portfolio returns with certified advisors who prioritize transparency and claims execution.
					</p>
					<div className="mt-2 flex gap-4">
						<Link href="/contact#consultation">
							<Button variant="primary-gradient">Talk to an Advisor</Button>
						</Link>
						<Link href="/services">
							<Button variant="secondary">Compare Services</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
