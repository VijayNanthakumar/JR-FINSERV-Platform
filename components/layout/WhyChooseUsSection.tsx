"use client";

import { ShieldCheck, Users, Clock, HeartHandshake } from "lucide-react";
import { Card } from "@/components/common/Card";
import { company } from "@/config/company";

const whyChooseUs = [
	{
		title: "Honest, Unbiased Advice",
		description: "Unbiased recommendations chosen purely for your family's financial goals.",
		icon: ShieldCheck,
	},
	{
		title: "One Dedicated Advisor",
		description: "Direct personal support. No call centers, no confusion, always available.",
		icon: Users,
	},
	{
		title: "We Help With Claims Too",
		description: "Direct personal coordination with insurers from filing to final settlement.",
		icon: HeartHandshake,
	},
	{
		title: "Trusted Since 2007",
		description: `An LIC MDRT (USA) Member since 2007, serving 3,500+ families across Tamil Nadu and 24+ countries.`,
		icon: Clock,
	},
];

export function WhyChooseUsSection() {
	return (
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
	);
}
