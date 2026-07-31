"use client";

import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		const handleScroll = () => setShowBackToTop(window.scrollY > 480);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
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
		</div>
	);
}
