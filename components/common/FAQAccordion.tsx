"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FAQItem {
	question: string;
	answer: string;
}

export interface FAQAccordionProps {
	items: FAQItem[];
	className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className={cn("flex flex-col border-t border-neutral-200 dark:border-navy-800 w-full", className)}>
			{items.map((item, index) => {
				const isOpen = openIndex === index;
				return (
					<div
						key={index}
						className="border-b border-neutral-200 dark:border-navy-800"
					>
						<button
							type="button"
							onClick={() => toggleItem(index)}
							className="flex items-center justify-between w-full py-5 text-left font-display font-semibold text-base md:text-lg text-navy-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg cursor-pointer group"
							aria-expanded={isOpen}
							aria-controls={`faq-answer-${index}`}
						>
							<span>{item.question}</span>
							<ChevronDown
								className={cn(
									"h-5 w-5 text-neutral-400 dark:text-navy-500 shrink-0 transition-transform duration-250 group-hover:text-blue-600 dark:group-hover:text-blue-400",
									isOpen && "rotate-180"
								)}
							/>
						</button>

						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									id={`faq-answer-${index}`}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: "easeOut" }}
									className="overflow-hidden"
								>
									<div className="pb-6 text-sm md:text-base text-neutral-600 dark:text-neutral-350 leading-relaxed font-body">
										{item.answer}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
}
