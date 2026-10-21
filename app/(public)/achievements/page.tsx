"use client";


import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Award, ShieldCheck } from "lucide-react";

export default function AchievementsPage() {
	const breadcrumbItems = [{ name: "Achievements" }];

	const keyAchievements = [
		{ number: 3500, suffix: "+", label: "Happy Customers", color: "blue" as const },
		{ number: 24, suffix: "+", label: "Countries Served", color: "emerald" as const },
	];

	const memberships = [
		{
			title: "AMFI Registered Mutual Fund Distributor",
			desc: "Empanelled with leading Asset Management Companies since inception.",
		},
		{
			title: "LIC MDRT (USA) Member",
			desc: "Member since 2007 — representing the global standard of financial advisory ethics.",
		},
		{
			title: "LIC Chairman's Club Member",
			desc: "The highest club member status awarded to top-performing advisors nationally.",
		},
		{
			title: "Star Health Elite Advisor",
			desc: "Elite advisor status representing excellence in health insurance service.",
		},
		{
			title: "ZM Club Member",
			desc: "LIC Zonal Manager Club member recognized for sustained excellence.",
		},
		{
			title: "FACT Member, Coimbatore",
			desc: "Active member of the Coimbatore financial advisory community.",
		},
		{
			title: "IFA Galaxy Member, Chennai",
			desc: "Empanelled member of the Chennai Independent Financial Advisors network.",
		},
		{
			title: "SIFAA Member, Salem",
			desc: "Member of the Salem Independent Financial Advisors Association.",
		},
		{
			title: "Lions Club Leadership",
			desc: "Distinguished community leader, Ln. V. Janarthanam, serving active local welfare projects.",
		},
		{
			title: "Community Service Projects",
			desc: "Leading regular blood donation camps, reforestation drives, and vision care pledges.",
		},
	];

	return (
		<div className="flex flex-col w-full">
			{/* Page Banner */}
			<PageBanner
				title="Our Credentials &amp; Recognitions"
				description="Two decades of honest advisory work, recognised by the institutions we work with."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* 1. Trust Stats */}
			<section className="py-20 md:py-28 bg-white">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
						AT A GLANCE
					</span>
					<h2 className="font-display text-3xl font-bold text-navy-900">
						Trusted by Families Near and Far
					</h2>
					<p className="text-sm text-neutral-500 max-w-xl mx-auto mb-10 font-body">
						An AMFI Registered Mutual Fund Distributor, proud to serve clients across Tamil Nadu and around the world.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-xl mx-auto w-full">
						{keyAchievements.map((ach, idx) => (
							<AchievementCard
								key={idx}
								number={ach.number}
								suffix={ach.suffix}
								label={ach.label}
								colorVariant={ach.color}
							/>
						))}
					</div>
				</div>
			</section>

			{/* 2. Professional Memberships & Recognitions */}
			<section className="py-20 md:py-28 bg-neutral-50 border-y border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
					<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
						RECOGNITIONS
					</span>
					<h2 className="font-display text-3xl font-bold text-navy-900">
						Professional Memberships &amp; Achievements
					</h2>
					<p className="text-sm text-neutral-500 max-w-xl mx-auto mb-10 font-body">
						Credentials earned by our Managing Director, Ln. V. Janarthanam, CIP, over years of dedicated advisory work.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
						{memberships.map((item, idx) => (
							<Card
								key={idx}
								variant="resting"
								hoverEffect
								animateReveal
								delay={idx * 0.05}
								className="flex flex-col gap-3 border-neutral-200/80"
							>
								<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
									<Award className="h-5 w-5" />
								</div>
								<h3 className="font-display font-semibold text-sm text-navy-900 leading-snug">
									{item.title}
								</h3>
								<p className="text-xs text-neutral-500 leading-relaxed font-body">
									{item.desc}
								</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* End CTA */}
			<section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-blue-800 text-white text-center">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
					<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 border border-white/10 px-4 py-2 rounded-full">
						<ShieldCheck className="h-4 w-4" /> AMFI Registered &middot; LIC MDRT (USA) Since 2007
					</div>
					<h2 className="font-display text-3xl font-bold">
						Experience Puts Your Money in Safer Hands
					</h2>
					<p className="text-sm text-neutral-300 max-w-lg leading-relaxed font-body">
						Talk to our advisory desk about mutual funds, LIC, or insurance — honest guidance, no obligation.
					</p>
					<div className="mt-2 flex flex-col sm:flex-row gap-4">
						<Link href="/contact#consultation">
							<Button variant="primary-gradient" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400">
								Book Free Callback
							</Button>
						</Link>
						<Link href="/services">
							<Button variant="secondary" className="text-white border-white/20 hover:bg-white/10">
								Browse Services
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
