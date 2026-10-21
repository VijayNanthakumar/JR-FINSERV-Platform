


import { Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/config/company";
import { ContactForm } from "@/components/forms/ContactForm";

interface ContactConsultationSectionProps {
	eyebrow?: string;
	title?: string;
	description?: string;
	id?: string;
	className?: string;
}

export function ContactConsultationSection({
	eyebrow = "GET IN TOUCH",
	title = "Let's Talk About Your Family's Future",
	description = "Call us, WhatsApp us, or visit our office — whichever is easiest for you.",
	id = "contact",
	className,
}: ContactConsultationSectionProps) {
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

	return (
		<section id={id} className={cn("py-12 sm:py-16 md:py-28 bg-white", className)}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Contact split layout — 12 column grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* Left: Contact + Location details (5 columns) */}
					<div className="lg:col-span-5 flex flex-col gap-8">
						<div className="flex flex-col gap-4 text-left">
							<span className="text-xs font-bold uppercase tracking-widest text-blue-600">
								{eyebrow}
							</span>
							<h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
								{title}
							</h2>
							<p className="text-sm md:text-base text-neutral-500 leading-relaxed font-body">
								{description}
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
											<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
												{method.title}
											</span>
											<span className="text-lg md:text-xl font-bold text-navy-900 mt-0.5">
												{method.value}
											</span>
											<span className="text-xs text-neutral-500 mt-0.5 font-body font-light">
												{method.description}
											</span>
										</div>
									</div>
								</a>
							))}
						</div>

						{/* Secondary Contacts */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{secondaryContacts.map((method) => {
								const content = (
									<div className="flex items-center gap-4 bg-white border border-neutral-200/80 rounded-2xl p-4 hover:border-neutral-300 hover:shadow-xs transition-all h-full">
										<div className="h-9 w-9 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600 shrink-0 border border-neutral-100">
											<method.icon className="h-4.5 w-4.5" />
										</div>
										<div className="flex flex-col min-w-0">
											<span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
												{method.title}
											</span>
											<span className="text-xs font-semibold text-neutral-800 truncate mt-0.5 font-body">
												{method.value}
											</span>
										</div>
									</div>
								);
								return method.href ? (
									<a key={method.title} href={method.href} className="group">
										{content}
									</a>
								) : (
									<div key={method.title}>{content}</div>
								);
							})}
						</div>
					</div>

					{/* Right: Contact Form (7 columns) */}
					<div className="lg:col-span-7">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	);
}

