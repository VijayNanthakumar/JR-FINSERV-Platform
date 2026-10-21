"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryCardProps {
	src: string;
	alt: string;
	title: string;
	category: string;
	onClick?: () => void;
	className?: string;
}

export function GalleryCard({ src, alt, title, onClick, className }: GalleryCardProps) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
			onClick={onClick}
			className={cn(
				"relative w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-neutral-100 group cursor-pointer",
				className
			)}
		>
			{/* Image */}
			<Image
				src={src}
				alt={alt || title || "Gallery Image"}
				fill
				unoptimized
				className="object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
		</motion.div>
	);
}
