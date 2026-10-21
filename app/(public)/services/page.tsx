"use client";


import Link from "next/link";
import { PageBanner } from "@/components/common/PageBanner";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/common/Button";
import { servicesList } from "@/components/layout/Navbar";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
	const breadcrumbItems = [{ name: "Services" }];

	return (
		<div className="flex flex-col w-full">
			<PageBanner
				title="Our Services"
				description="Simple, honest guidance on savings and protection — chosen to match your family's needs."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Service Cards Grid */}
			<section className="py-20 md:py-28 bg-neutral-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch justify-center">
						{servicesList.map((service, index) => (
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								key={service.name}
							>
								<ServiceCard {...service} />
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Simple CTA */}
			<section className="py-16 md:py-24 bg-white border-t border-neutral-200">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
					<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
						<HelpCircle className="h-6 w-6" />
					</div>
					<h3 className="font-display font-bold text-2xl text-navy-900">
						Not Sure Which Plan Is Right for You?
					</h3>
					<p className="text-sm text-neutral-500 leading-relaxed font-body">
						Talk to one of our advisors. We&apos;ll listen to your goals and suggest what genuinely fits — no obligation.
					</p>
					<Link href="/contact#consultation">
						<Button variant="primary-gradient">
							Book a Free Consultation
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
