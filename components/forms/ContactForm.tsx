"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { company } from "@/config/company";

export function ContactForm() {
	const nameInputRef = useRef<HTMLInputElement>(null);

	const [form, setForm] = useState({
		name: "",
		mobile: "",
		email: "",
		service: "",
		message: "",
		consent: false,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	// Smart Auto Scroll & Auto Focus logic for /contact#consultation
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleAutoScrollAndFocus = () => {
			const hash = window.location.hash;
			const isExactConsultationHash =
				hash === "#consultation" ||
				hash === "#consultation-form" ||
				hash === "#enquiry-form";

			// ONLY execute when URL hash is explicitly #consultation
			if (isExactConsultationHash) {
				const formContainer =
					document.getElementById("consultation-form") ||
					document.getElementById("consultation");

				if (formContainer) {
					const headerOffset = 110;
					const elementPosition = formContainer.getBoundingClientRect().top;
					const offsetPosition =
						elementPosition + window.pageYOffset - headerOffset;

					const prefersReducedMotion = window.matchMedia(
						"(prefers-reduced-motion: reduce)"
					).matches;

					window.scrollTo({
						top: offsetPosition,
						behavior: prefersReducedMotion ? "auto" : "smooth",
					});

					// Focus Full Name input field after scroll animation finishes
					const timer = setTimeout(
						() => {
							nameInputRef.current?.focus({ preventScroll: true });
						},
						prefersReducedMotion ? 50 : 450
					);

					return () => clearTimeout(timer);
				}
			}
		};

		// Initial check on mount
		const initialTimer = setTimeout(handleAutoScrollAndFocus, 100);

		// Hash change listener (if user clicks CTA while on /contact page or back/forward nav)
		window.addEventListener("hashchange", handleAutoScrollAndFocus);

		return () => {
			clearTimeout(initialTimer);
			window.removeEventListener("hashchange", handleAutoScrollAndFocus);
		};
	}, []);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!form.name.trim()) {
			newErrors.name = "Full name is required.";
		}
		if (!form.mobile.trim()) {
			newErrors.mobile = "Mobile number is required.";
		} else if (!/^\d{10}$/.test(form.mobile.replace(/\s+/g, ""))) {
			newErrors.mobile = "Please enter a valid 10-digit mobile number.";
		}
		if (!form.email.trim()) {
			newErrors.email = "Email address is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = "Please enter a valid email address.";
		}
		if (!form.service) {
			newErrors.service = "Please select a service of interest.";
		}
		if (!form.consent) {
			newErrors.consent = "You must agree to be contacted regarding this enquiry.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
		setForm((prev) => ({ ...prev, [name]: val }));
		
		// Clear local error when user types
		if (errors[name]) {
			setErrors((prev) => {
				const copy = { ...prev };
				delete copy[name];
				return copy;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsLoading(true);
		setSubmitError(null);

		try {
			const res = await fetch("/api/enquiries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: form.name,
					phone: form.mobile,   // DB column is `phone`
					email: form.email || undefined,
					service: form.service,
					message: form.message,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				setSubmitError(
					data.message ?? "Something went wrong. Please try again.",
				);
				return;
			}

			// Success — show the confirmation screen
			setIsSubmitted(true);
		} catch {
			setSubmitError(
				"Unable to reach the server. Please check your connection and try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSubmitted) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-sm"
			>
				<CheckCircle className="h-16 w-16 text-emerald-600 animate-bounce" />
				<h3 className="font-display font-bold text-2xl text-neutral-800">
					Enquiry Sent Successfully
				</h3>
				<p className="text-sm text-neutral-600 max-w-md leading-relaxed font-body">
					Thank you for contacting {company.name}, <strong>{form.name}</strong>. A senior financial advisor has been notified. 
					We typically review enquiries and follow up within <strong>4 business hours</strong>.
				</p>
				<Button
					onClick={() => {
						setForm({ name: "", mobile: "", email: "", service: "", message: "", consent: false });
						setSubmitError(null);
						setIsSubmitted(false);
					}}
					variant="secondary"
					className="mt-4"
				>
					Send Another Message
				</Button>
			</motion.div>
		);
	}

	return (
		<motion.div
			id="consultation-form"
			initial={{ opacity: 0, y: 16, scale: 0.98 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className="w-full scroll-mt-28 sm:scroll-mt-32"
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-white border border-neutral-200 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
				<div className="flex flex-col gap-1">
					<h3 className="font-display font-bold text-lg md:text-xl text-navy-900">
						Book a Consultation
					</h3>
					<p className="text-xs text-neutral-500 font-body">
						Fill out this brief form and our team will get in touch with you shortly.
					</p>
				</div>

				<div className="h-[1px] bg-neutral-100" />

				{/* Full Name */}
				<div className="flex flex-col gap-1.5">
					<label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
						Full Name <span className="text-red-500">*</span>
					</label>
					<input
						id="contact-name"
						ref={nameInputRef}
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						aria-required="true"
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? "contact-name-error" : undefined}
						placeholder="Enter your legal name"
						className={`h-11 px-4 text-sm bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 text-neutral-900 placeholder-neutral-400 transition-all duration-200 ${
							errors.name
								? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
								: "border-neutral-200 focus:ring-blue-600/20 focus:border-blue-600"
						}`}
					/>
					{errors.name && (
						<span id="contact-name-error" className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.name}
						</span>
					)}
				</div>

				{/* Phone and Email Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Mobile Number */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="contact-mobile" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
							Mobile Number <span className="text-red-500">*</span>
						</label>
						<div className="relative flex items-center">
							<span className="absolute left-3 text-sm text-neutral-400 font-medium">+91</span>
							<input
								id="contact-mobile"
								type="tel"
								name="mobile"
								value={form.mobile}
								onChange={handleChange}
								aria-required="true"
								aria-invalid={!!errors.mobile}
								aria-describedby={errors.mobile ? "contact-mobile-error" : undefined}
								placeholder="99999 99999"
								className={`h-11 pl-12 pr-4 w-full text-sm bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 text-neutral-900 placeholder-neutral-400 transition-all duration-200 ${
									errors.mobile
										? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
										: "border-neutral-200 focus:ring-blue-600/20 focus:border-blue-600"
								}`}
							/>
						</div>
						{errors.mobile && (
							<span id="contact-mobile-error" className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
								<AlertCircle className="h-3.5 w-3.5" /> {errors.mobile}
							</span>
						)}
					</div>

					{/* Email Address */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
							Email Address <span className="text-red-500">*</span>
						</label>
						<input
							id="contact-email"
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							aria-required="true"
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "contact-email-error" : undefined}
							placeholder="name@example.com"
							className={`h-11 px-4 text-sm bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 text-neutral-900 placeholder-neutral-400 transition-all duration-200 ${
								errors.email
									? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
									: "border-neutral-200 focus:ring-blue-600/20 focus:border-blue-600"
							}`}
						/>
						{errors.email && (
							<span id="contact-email-error" className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
								<AlertCircle className="h-3.5 w-3.5" /> {errors.email}
							</span>
						)}
					</div>
				</div>

				{/* Service Dropdown */}
				<div className="flex flex-col gap-1.5">
					<label htmlFor="contact-service" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
						Service of Interest <span className="text-red-500">*</span>
					</label>
					<select
						id="contact-service"
						name="service"
						value={form.service}
						onChange={handleChange}
						aria-required="true"
						aria-invalid={!!errors.service}
						aria-describedby={errors.service ? "contact-service-error" : undefined}
						className={`h-11 px-4 text-sm bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 text-neutral-900 placeholder-neutral-400 transition-all duration-200 ${
							errors.service
								? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
								: "border-neutral-200 focus:ring-blue-600/20 focus:border-blue-600"
						}`}
					>
						<option value="" disabled>Select a financial category</option>
						<option value="mutual-funds">Mutual Funds Advisory</option>
						<option value="lic">LIC Life Insurance</option>
						<option value="health-insurance">Star Health Insurance Plan</option>
						<option value="general-insurance">General & Vehicle Insurance</option>
					</select>
					{errors.service && (
						<span id="contact-service-error" className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.service}
						</span>
					)}
				</div>

				{/* Message Textarea */}
				<div className="flex flex-col gap-1.5">
					<label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
						Your Message / Requirements <span className="text-[10px] text-neutral-400 font-normal lowercase">(optional)</span>
					</label>
					<textarea
						id="contact-message"
						name="message"
						rows={4}
						value={form.message}
						onChange={handleChange}
						placeholder="Describe your short/long-term financial goals or policy coverage details..."
						className={`px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 text-neutral-900 placeholder-neutral-400 transition-all duration-200 resize-y min-h-[100px] ${
							errors.message
								? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
								: "border-neutral-200 focus:ring-blue-600/20 focus:border-blue-600"
						}`}
					/>
					{errors.message && (
						<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.message}
						</span>
					)}
				</div>

				{/* Consent Checkbox */}
				<div className="flex flex-col gap-2">
					<label htmlFor="contact-consent" className="flex items-start gap-3 cursor-pointer">
						<input
							id="contact-consent"
							type="checkbox"
							name="consent"
							checked={form.consent}
							onChange={handleChange}
							aria-required="true"
							className="h-5 w-5 rounded border-neutral-300 bg-neutral-50 text-blue-600 focus:ring-blue-600 mt-0.5"
						/>
						<span className="text-xs text-neutral-500 leading-relaxed select-none">
							I agree to the terms of use and explicitly consent to {company.name} contacting me regarding my query via Mobile, WhatsApp, or Email.
						</span>
					</label>
					{errors.consent && (
						<span id="contact-consent-error" className="flex items-center gap-1.5 text-xs text-red-600 mt-1 pl-8">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.consent}
						</span>
					)}
				</div>

				{/* API-level submission error */}
				{submitError && (
					<div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
						<span>{submitError}</span>
					</div>
				)}

				{/* Submit Button */}
				<Button
					type="submit"
					variant="primary-gradient"
					className="w-full mt-2"
					isLoading={isLoading}
				>
					Send Enquiry Message
				</Button>
			</form>
		</motion.div>
	);
}

