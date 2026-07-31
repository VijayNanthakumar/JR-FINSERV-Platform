"use client";


import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center min-h-[70vh] bg-white px-4 py-16 md:py-24 text-center">
			<div className="max-w-md w-full flex flex-col items-center gap-6">
				{/* 1. Brand-styled flat-line illustration */}
				<motion.div
					animate={{ y: [0, -8, 0] }}
					transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
					className="h-20 w-20 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0"
				>
					<Compass className="h-10 w-10 animate-spin-slow" />
				</motion.div>

				{/* 2. Headline & details */}
				<div className="flex flex-col gap-2">
					<span className="font-display text-5xl sm:text-6xl font-extrabold text-navy-800 tracking-tight leading-none select-none">
						404
					</span>
					<h1 className="font-display text-2xl font-bold text-navy-950 leading-snug">
						This page has wandered off
					</h1>
					<p className="text-xs sm:text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed font-body">
						The link may be broken or the financial compliance policy page was relocated. Let&apos;s get you back on track.
					</p>
				</div>

				{/* 3. Redirect Links */}
				<div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
					<Link href="/" className="flex-grow">
						<Button variant="secondary" className="w-full text-xs h-10">
							Go to Home
						</Button>
					</Link>
					<Link href="/services" className="flex-grow">
						<Button variant="secondary" className="w-full text-xs h-10">
							Our Services
						</Button>
					</Link>
					<Link href="/contact" className="flex-grow">
						<Button variant="secondary" className="w-full text-xs h-10">
							Contact Desk
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
