"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { company } from "@/config/company";

export function ContactForm() {
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
			<div className="bg-emerald-50 border border-emerald-300 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4">
				<CheckCircle className="h-16 w-16 text-emerald-600 animate-bounce" />
				<h3 className="font-display font-bold text-2xl text-neutral-800">
					Enquiry Sent Successfully
				</h3>
				<p className="text-sm text-neutral-600 max-w-md leading-relaxed">
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
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-white border border-neutral-200 p-6 md:p-8 rounded-xl shadow-xs">
			<div className="flex flex-col gap-1">
				<h3 className="font-display font-bold text-lg md:text-xl text-navy-900">
					Book a Consultation
				</h3>
				<p className="text-xs text-neutral-500">
					Fill out this brief form and our team will get in touch with you shortly.
				</p>
			</div>

			<div className="h-[1px] bg-neutral-100" />

			{/* Full Name */}
			<div className="flex flex-col gap-1.5">
				<label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
					Full Name <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Enter your legal name"
					className={`h-11 px-4 text-sm bg-neutral-50 border rounded-lg focus:outline-none focus:ring-1 text-neutral-900 placeholder-neutral-400 transition-colors ${
						errors.name
							? "border-red-500 focus:ring-red-500 focus:border-red-500"
							: "border-neutral-200 focus:ring-blue-600 focus:border-blue-600"
					}`}
				/>
				{errors.name && (
					<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
						<AlertCircle className="h-3.5 w-3.5" /> {errors.name}
					</span>
				)}
			</div>

			{/* Phone and Email Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Mobile Number */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
						Mobile Number <span className="text-red-500">*</span>
					</label>
					<div className="relative flex items-center">
						<span className="absolute left-3 text-sm text-neutral-400 font-medium">+91</span>
						<input
							type="tel"
							name="mobile"
							value={form.mobile}
							onChange={handleChange}
							placeholder="99999 99999"
							className={`h-11 pl-12 pr-4 w-full text-sm bg-neutral-50 border rounded-lg focus:outline-none focus:ring-1 text-neutral-900 placeholder-neutral-400 transition-colors ${
								errors.mobile
									? "border-red-500 focus:ring-red-500 focus:border-red-500"
									: "border-neutral-200 focus:ring-blue-600 focus:border-blue-600"
							}`}
						/>
					</div>
					{errors.mobile && (
						<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.mobile}
						</span>
					)}
				</div>

				{/* Email Address */}
				<div className="flex flex-col gap-1.5">
					<label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
						Email Address <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="name@example.com"
						className={`h-11 px-4 text-sm bg-neutral-50 border rounded-lg focus:outline-none focus:ring-1 text-neutral-900 placeholder-neutral-400 transition-colors ${
							errors.email
								? "border-red-500 focus:ring-red-500 focus:border-red-500"
								: "border-neutral-200 focus:ring-blue-600 focus:border-blue-600"
						}`}
					/>
					{errors.email && (
						<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
							<AlertCircle className="h-3.5 w-3.5" /> {errors.email}
						</span>
					)}
				</div>
			</div>

			{/* Service Dropdown */}
			<div className="flex flex-col gap-1.5">
				<label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
					Service of Interest <span className="text-red-500">*</span>
				</label>
				<select
					name="service"
					value={form.service}
					onChange={handleChange}
					className={`h-11 px-4 text-sm bg-neutral-50 border rounded-lg focus:outline-none focus:ring-1 text-neutral-900 placeholder-neutral-400 transition-colors ${
						errors.service
							? "border-red-500 focus:ring-red-500"
							: "border-neutral-200 focus:ring-blue-600"
					}`}
				>
					<option value="" disabled>Select a financial category</option>
					<option value="mutual-funds">Mutual Funds Advisory</option>
					<option value="lic">LIC Life Insurance</option>
					<option value="health-insurance">Star Health Insurance Plan</option>
					<option value="general-insurance">General Asset Insurance</option>
					<option value="vehicle-insurance">Vehicle Insurance</option>
				</select>
				{errors.service && (
					<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
						<AlertCircle className="h-3.5 w-3.5" /> {errors.service}
					</span>
				)}
			</div>

			{/* Message Textarea */}
			<div className="flex flex-col gap-1.5">
				<label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
					Your Message / Requirements <span className="text-[10px] text-neutral-400 font-normal lowercase">(optional)</span>
				</label>
				<textarea
					name="message"
					rows={4}
					value={form.message}
					onChange={handleChange}
					placeholder="Describe your short/long-term financial goals or policy coverage details..."
					className={`px-4 py-3 text-sm bg-neutral-50 border rounded-lg focus:outline-none focus:ring-1 text-neutral-900 placeholder-neutral-400 transition-colors resize-y min-h-[100px] ${
						errors.message
							? "border-red-500 focus:ring-red-500 focus:border-red-500"
							: "border-neutral-200 focus:ring-blue-600 focus:border-blue-600"
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
				<label className="flex items-start gap-3 cursor-pointer">
					<input
						type="checkbox"
						name="consent"
						checked={form.consent}
						onChange={handleChange}
						className="h-5 w-5 rounded border-neutral-300 bg-neutral-50 text-blue-600 focus:ring-blue-600 mt-0.5"
					/>
					<span className="text-xs text-neutral-500 leading-relaxed select-none">
						I agree to the terms of use and explicitly consent to {company.name} contacting me regarding my query via Mobile, WhatsApp, or Email.
					</span>
				</label>
				{errors.consent && (
					<span className="flex items-center gap-1.5 text-xs text-red-600 mt-1 pl-8">
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
	);
}
