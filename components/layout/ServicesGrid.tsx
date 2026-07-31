"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { servicesList } from "@/config/services-list";

/**
 * ServicesGrid — Client Component.
 * Renders the animated services grid on the homepage.
 * Must be a Client Component because it uses framer-motion whileInView
 * and ServiceCard (which may contain interactive elements).
 */
export function ServicesGrid() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left items-stretch justify-center">
			{servicesList.map((service, index) => (
				<motion.div
					key={service.name}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: index * 0.05 }}
				>
					<ServiceCard {...service} />
				</motion.div>
			))}
		</div>
	);
}

