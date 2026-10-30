"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowUp } from "lucide-react";

import { company } from "@/config/company";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
			<path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.986.583 3.834 1.588 5.386L2 22l4.735-1.557A9.953 9.953 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.11a8.09 8.09 0 01-4.13-1.13l-.296-.176-2.81.924.938-2.74-.193-.282A8.083 8.083 0 013.9 12c0-4.472 3.63-8.1 8.1-8.1 4.47 0 8.1 3.628 8.1 8.1 0 4.472-3.63 8.11-8.1 8.11z" />
		</svg>
	);
}

export function FloatingActions() {
	const [showBackToTop, setShowBackToTop] = useState(false);
	const [showAssistant, setShowAssistant] = useState(false);

	useEffect(() => {
		const handleScroll = () => setShowBackToTop(window.scrollY > 480);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setShowAssistant(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="fixed bottom-5 right-4 sm:right-5 z-[9999] flex flex-col items-end gap-3 max-sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] max-sm:right-[calc(1rem+env(safe-area-inset-right))]">
			<AnimatePresence>
				{showBackToTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0.7, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.7, y: 10 }}
						transition={{ duration: 0.2 }}
						onClick={scrollToTop}
						aria-label="Back to top"
						className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-navy-900 text-white shadow-lg flex items-center justify-center hover:bg-navy-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
					>
						<ArrowUp className="h-5 w-5" />
					</motion.button>
				)}
			</AnimatePresence>

			<motion.a
				href={company.phone.href}
				aria-label={`Call ${company.name}`}
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.95 }}
				className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
			>
				<Phone className="h-5 w-5 sm:h-6 sm:w-6" />
			</motion.a>

			<motion.a
				href={company.whatsapp.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Chat on WhatsApp"
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.95 }}
				className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center hover:bg-emerald-400 transition-colors cursor-pointer relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
			>
				<span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
				<WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 relative" />
			</motion.a>

			<div className="relative">
				<AnimatePresence>
					{showAssistant && (
						<motion.section
							initial={{ opacity: 0, y: 8, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 8, scale: 0.96 }}
							transition={{ duration: 0.2 }}
							role="dialog"
							aria-labelledby="ai-assistant-heading"
							className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-2xl sm:w-80"
						>
							<button
								type="button"
								onClick={() => setShowAssistant(false)}
								aria-label="Close AI Assistant welcome panel"
								className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-blue-50 hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
							>
								<span aria-hidden="true" className="text-xl leading-none">
									&times;
								</span>
							</button>
							<h2
								id="ai-assistant-heading"
								className="pr-8 text-base font-bold leading-tight text-navy-900"
							>
								JR FINSERV Financial AI Assistant
							</h2>
							<p className="mt-3 text-sm leading-6 text-slate-600">
								Hi! Welcome to JR FINSERV. How can I help you with mutual funds,
								insurance, or our services?
							</p>
							<a
								href="https://chatgpt.com/g/g-6a7a12d64c4081919754dff507aee5a9-jr-finserv-financial-ai-assistant"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
							>
								Chat with Our AI Assistant
							</a>
						</motion.section>
					)}
				</AnimatePresence>
				<motion.button
					type="button"
					onClick={() => setShowAssistant((isOpen) => !isOpen)}
					aria-label="Ask JR FINSERV AI"
					aria-expanded={showAssistant}
					title="Ask JR FINSERV AI"
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.95 }}
					className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white p-1 shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:h-14 sm:w-14"
				>
					<Image
						src="/images/ai-assistant/ai-assistant.png"
						alt=""
						fill
						sizes="(min-width: 640px) 56px, 48px"
						className="object-contain"
					/>
				</motion.button>
			</div>
		</div>
	);
}
