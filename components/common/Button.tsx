"use client";


import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
	variant?: "primary" | "primary-gradient" | "secondary" | "ghost" | "emerald" | "destructive" | "link";
	size?: "sm" | "md" | "lg" | "icon";
	isLoading?: boolean;
}

export function Button({
	className,
	variant = "primary",
	size = "md",
	isLoading = false,
	children,
	disabled,
	...props
}: ButtonProps) {
	const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-200 cursor-pointer";
	
	const variants = {
		primary: "bg-blue-700 text-white hover:bg-blue-600 border border-blue-700 shadow-sm active:scale-[0.98] transform font-semibold",
		"primary-gradient": "relative overflow-hidden bg-navy-900 text-white hover:bg-navy-800 border border-navy-950 shadow-md group active:scale-[0.98] transform font-semibold",
		secondary: "border border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 shadow-xs active:scale-[0.98] transform font-semibold",
		ghost: "text-blue-700 hover:bg-blue-50/50 hover:underline font-semibold",
		emerald: "bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-600 shadow-sm active:scale-[0.98] transform font-semibold",
		destructive: "bg-destructive text-white hover:bg-red-500 border border-destructive shadow-sm active:scale-[0.98] transform font-semibold",
		link: "text-blue-700 p-0 hover:underline inline-flex items-center gap-1 font-semibold",
	};

	const sizes = {
		sm: "h-9 px-4 text-xs",
		md: "h-11 px-6 text-sm",
		lg: "h-13 px-8 text-base",
		icon: "h-10 w-10 p-0",
	};

	return (
		<motion.button
			whileTap={{ scale: 0.98 }}
			disabled={disabled || isLoading}
			className={cn(baseStyles, variants[variant], sizes[size], className)}
			{...props}
		>
			{isLoading ? (
				<span className="flex items-center justify-center gap-2">
					<svg
						className="animate-spin h-5 w-5 text-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					<span>Processing...</span>
				</span>
			) : (
				<>
					{children}
					{/* Sweep shine sweep effect for primary-gradient on hover */}
					{variant === "primary-gradient" && (
						<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
					)}
				</>
			)}
		</motion.button>
	);
}
