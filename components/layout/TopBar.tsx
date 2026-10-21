"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";

import { company } from "@/config/company";

export function TopBar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.div
			initial={false}
			animate={{ height: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="hidden lg:block w-full bg-navy-900 text-neutral-300 fixed top-0 left-0 right-0 z-[60] overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs">
				<div className="flex items-center gap-6">
					<a
						href={company.phone.href}
						className="flex items-center gap-2 hover:text-white transition-colors"
					>
						<Phone className="h-3.5 w-3.5 text-emerald-400" />
						{company.phone.display}
					</a>
					<a
						href={company.email.href}
						className="flex items-center gap-2 hover:text-white transition-colors"
					>
						<Mail className="h-3.5 w-3.5 text-emerald-400" />
						{company.email.display}
					</a>
					<span className="flex items-center gap-2 text-neutral-400">
						<Clock className="h-3.5 w-3.5 text-emerald-400" />
						{company.officeHours.short}
					</span>
				</div>

				<div className="flex items-center gap-4 text-neutral-400">
					<span>AMFI Registered Mutual Fund Distributor</span>
					<span className="text-neutral-600">|</span>
					<span>LIC MDRT (USA) Member Since 2007</span>
				</div>
			</div>
		</motion.div>
	);
}
