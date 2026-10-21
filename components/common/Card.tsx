"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "resting" | "elevated" | "glass";
	hoverEffect?: boolean;
	animateReveal?: boolean;
	delay?: number;
}

export function Card({
	className,
	variant = "resting",
	hoverEffect = false,
	animateReveal = false,
	delay = 0,
	children,
	...props
}: CardProps) {
	const variants = {
		resting: "bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(10,27,51,0.02)] rounded-2xl p-6 md:p-8",
		elevated: "bg-white shadow-[0_8px_24px_rgba(10,27,51,0.04)] rounded-2xl p-6 md:p-8 border border-neutral-100",
		glass: "bg-white/80 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(10,27,51,0.04)] rounded-2xl p-6 md:p-8",
	};

	const hoverStyles = hoverEffect
		? "hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(10,27,51,0.06)] hover:border-blue-500/20 transition-all duration-300 ease-out"
		: "transition-all duration-300 ease-out";

	if (animateReveal) {
		const motionProps = props as React.ComponentPropsWithoutRef<typeof motion.div>;
		return (
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay, ease: "easeOut" }}
				className={cn(variants[variant], hoverStyles, className)}
				{...motionProps}
			>
				{children}
			</motion.div>
		);
	}

	return (
		<div
			className={cn(variants[variant], hoverStyles, className)}
			{...props}
		>
			{children}
		</div>
	);
}
