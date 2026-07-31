"use client";


import { PageBanner } from "@/components/common/PageBanner";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/common/Card";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { company } from "@/config/company";

export default function ContactPage() {
	const breadcrumbItems = [{ name: "Contact" }];

	const contactMethods = [
		{
			title: "Call Us",
			value: company.phone.display,
			desc: company.officeHours.display,
			href: company.phone.href,
			icon: Phone,
		},
		{
			title: "WhatsApp Us",
			value: company.whatsapp.display,
			desc: "Quick questions or document sharing",
			href: company.whatsapp.href,
			icon: MessageSquare,
		},
		{
			title: "Email Us",
			value: company.email.display,
			desc: "We reply within 24 hours on working days",
			href: company.email.href,
			icon: Mail,
		},
	];

	return (
		<div className="flex flex-col w-full">
			<PageBanner
				title="Contact Us"
				description="Reach out for mutual fund advice, insurance quotes, or claim support. We're here to help, online and in person."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Contact Body */}
			<section className="py-20 md:py-28 bg-neutral-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Left: Contact Form UI */}
					<div className="lg:col-span-7 flex flex-col justify-center">
						<ContactForm />
					</div>

					{/* Right: Contact Method Stack */}
					<div className="lg:col-span-5 flex flex-col gap-6 text-left">
						<div className="flex flex-col gap-2">
							<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
								DIRECT CONTACT
							</span>
							<h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 leading-tight">
								Talk to an Advisor Directly
							</h2>
							<p className="text-sm text-neutral-500 leading-relaxed font-body mt-1">
								Choose whichever way is easiest for you — we respond quickly.
							</p>
						</div>

						{/* Contact Cards */}
						<div className="flex flex-col gap-4">
							{contactMethods.map((method, idx) => (
								<a
									key={idx}
									href={method.href}
									target={method.icon === MessageSquare ? "_blank" : undefined}
									rel={method.icon === MessageSquare ? "noopener noreferrer" : undefined}
									className="group"
								>
									<Card
										variant="resting"
										className="flex items-start gap-4 p-5 hover:border-blue-500/25 hover:shadow-md transition-all duration-200"
									>
										<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
											<method.icon className="h-5 w-5" />
										</div>
										<div className="flex flex-col min-w-0">
											<span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
												{method.title}
											</span>
											<span className="font-semibold text-sm sm:text-base text-neutral-800 mt-0.5 truncate">
												{method.value}
											</span>
											<span className="text-xs text-neutral-500 mt-1 leading-none">
												{method.desc}
											</span>
										</div>
									</Card>
								</a>
							))}
						</div>

						{/* Office Hours */}
						<Card variant="resting" className="border-neutral-100 p-6 flex items-start gap-4 shadow-xs">
							<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
								<Clock className="h-5 w-5" />
							</div>
							<div className="flex flex-col">
								<span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
									Office Hours
								</span>
								<span className="font-semibold text-sm text-neutral-800 mt-1">
									{company.officeHours.display}
								</span>
								<span className="text-xs text-neutral-500 mt-1">
									{company.officeHours.closed}
								</span>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Branch Location + Map */}
			<section className="py-20 md:py-28 bg-white border-t border-neutral-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Address details */}
					<div className="flex flex-col gap-6 text-left">
						<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
							VISIT OUR OFFICE
						</span>
						<h2 className="font-display text-3xl font-bold text-navy-900 leading-tight">
							Come See Us in Komarapalayam
						</h2>
						<p className="text-sm md:text-base text-neutral-600 leading-relaxed font-body">
							Prefer talking in person? Drop by our office anytime during working hours. No appointment needed.
						</p>

						<div className="flex items-start gap-3 mt-2">
							<MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
							<div>
								<h3 className="font-semibold text-sm text-neutral-800">{company.name} Office</h3>
								<p className="text-sm text-neutral-500 leading-relaxed mt-1">
									{company.address.full}
								</p>
							</div>
						</div>
					</div>

					{/* Real embedded Google Map */}
					<div className="relative overflow-hidden h-[300px] md:h-[350px] w-full rounded-2xl border border-neutral-200 shadow-md">
						<iframe
							title={`${company.name} office location on Google Maps`}
							src={company.googleMaps.embedUrl}
							className="absolute inset-0 w-full h-full border-0"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
