"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";
import {
	Menu,
	X,
	ChevronDown,
	UserCircle2,
	ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/config/company";
import { servicesList } from "@/config/services-list";

// Re-export so any existing imports from Navbar still work
export { servicesList };

export function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on path changes
	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsMegaMenuOpen(false);
	}, [pathname]);

	const navItems = [
		{ name: "About", href: "/about" },
		{ name: "Gallery", href: "/gallery" },
		{ name: "Contact", href: "/contact" },
	];

	// Navbar is a consistently light bar now that the hero itself is light;
	// text stays dark throughout, only the shadow/border intensify on scroll.
	const navTextClass = "text-neutral-600";
	const navTextHoverClass = "hover:text-blue-600";

	return (
		<header
			className={cn(
				"fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b bg-white/95 backdrop-blur-md",
				scrolled
					? "top-0 h-[68px] md:h-[76px] lg:h-[92px] shadow-sm border-neutral-200"
					: "top-0 lg:top-10 h-[80px] md:h-[92px] lg:h-[120px] shadow-none border-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3 lg:gap-4 group z-10 shrink-0">
					<Image
						src={company.logo}
						alt={`${company.name} Logo`}
						width={200}
						height={96}
						priority
						className={cn(
							"w-auto object-contain transition-all duration-300 rounded-xl shadow-xs shrink-0",
							scrolled
								? "h-[48px] md:h-[56px] lg:h-[76px]"
								: "h-[56px] md:h-[68px] lg:h-[96px]"
						)}
					/>
					<div className="flex flex-col leading-none justify-center">
						<span
							className={cn(
								"font-display font-extrabold tracking-tight transition-all duration-300 text-navy-900 group-hover:text-blue-500 whitespace-nowrap",
								scrolled
									? "text-lg md:text-xl lg:text-[28px]"
									: "text-xl md:text-2xl lg:text-[38px]"
							)}
						>
							{company.name}
						</span>
						<span
							className={cn(
								"text-neutral-400 font-light tracking-wider transition-all duration-300 uppercase mt-0.5",
								scrolled
									? "text-[9px] md:text-[10px] lg:text-[11px]"
									: "text-[10px] md:text-xs lg:text-[13px]"
							)}
						>
							{company.tagline}
						</span>
					</div>
				</Link>

				{/* Desktop Nav Items */}
				<nav className="hidden lg:flex items-center gap-6 lg:ml-8 xl:absolute xl:left-1/2 xl:-translate-x-1/2 z-0">
					<Link
						href="/"
						className={cn(
							"text-sm font-medium transition-colors",
							pathname === "/" ? "text-blue-600 font-semibold" : cn(navTextClass, navTextHoverClass)
						)}
					>
						Home
					</Link>

					{/* Services Dropdown */}
					<div
						className="relative"
						onMouseEnter={() => setIsMegaMenuOpen(true)}
						onMouseLeave={() => setIsMegaMenuOpen(false)}
					>
						<button
							type="button"
							onClick={() => setIsMegaMenuOpen((prev) => !prev)}
							suppressHydrationWarning
							aria-expanded={isMegaMenuOpen}
							aria-haspopup="true"
							aria-controls="navbar-services-menu"
							className={cn(
								"flex items-center gap-1 py-2 text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
								pathname.startsWith("/services")
									? "text-blue-600 font-semibold"
									: cn(navTextClass, navTextHoverClass)
							)}
						>
							Services <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMegaMenuOpen && "rotate-180")} />
						</button>

						<AnimatePresence>
							{isMegaMenuOpen && (
								<motion.div
									id="navbar-services-menu"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.15 }}
									className="absolute top-full -left-20 w-[450px] bg-white border border-neutral-200 shadow-xl rounded-xl p-4 grid grid-cols-1 gap-2 z-50 mt-1"
								>
									<div className="font-display font-semibold text-xs text-neutral-400 uppercase tracking-widest px-3 mb-1">
										Our Financial Expertise
									</div>
									{servicesList.map((service) => (
										<Link
											key={service.name}
											href={service.href}
											className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-150 group"
										>
											<div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", service.bgColor)}>
												<service.icon className={cn("h-5 w-5", service.iconColor)} />
											</div>
											<div>
												<div className="text-sm font-semibold text-neutral-800 group-hover:text-blue-600">
													{service.name}
												</div>
												<p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
													{service.description}
												</p>
											</div>
										</Link>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors",
								pathname === item.href
									? "text-blue-600 font-semibold"
									: cn(navTextClass, navTextHoverClass)
							)}
						>
							{item.name}
						</Link>
					))}
				</nav>

				{/* Right Side Actions */}
				<div className="hidden lg:flex items-center gap-3">
					{/* Investor Login */}
					<a
						href="https://jrassociates.themfbox.com"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 active:bg-navy-950 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm group"
					>
						<UserCircle2 className="h-4 w-4 shrink-0" />
						<span>Investor Login</span>
						<ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:translate-x-0.5 transition-transform" />
					</a>
					<Link href="/contact#consultation">
						<Button variant="primary-gradient" size="sm">
							Book a Free Consultation
						</Button>
					</Link>
				</div>

				{/* Mobile Controls */}
				<div className="flex items-center gap-2 lg:hidden">
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isMobileMenuOpen}
						className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
					>
						{isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>
			</div>

			{/* Mobile Overlay Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="lg:hidden w-full bg-white border-b border-neutral-200 absolute top-full left-0 overflow-y-auto max-h-[85vh] z-50 p-6 flex flex-col gap-6"
					>
						<div className="flex flex-col gap-4">
							<div className="font-display font-semibold text-xs text-neutral-400 uppercase tracking-widest">
								Our Services
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{servicesList.map((service) => (
									<Link
										key={service.name}
										href={service.href}
										className="flex items-center gap-3 p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors"
									>
										<div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", service.bgColor)}>
											<service.icon className={cn("h-4 w-4", service.iconColor)} />
										</div>
										<span className="text-sm font-semibold text-neutral-800">
											{service.name}
										</span>
									</Link>
								))}
							</div>
						</div>

						<div className="h-[1px] bg-neutral-100" />

						<div className="flex flex-col gap-4">
							<Link
								href="/"
								className={cn(
									"text-base font-medium transition-colors hover:text-blue-600 py-1",
									pathname === "/" ? "text-blue-600 font-semibold" : "text-neutral-800"
								)}
							>
								Home
							</Link>
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"text-base font-medium transition-colors hover:text-blue-600 py-1",
										pathname === item.href ? "text-blue-600 font-semibold" : "text-neutral-800"
									)}
								>
									{item.name}
								</Link>
							))}
						</div>

						<div className="flex flex-col gap-3 mt-2">
							{/* Investor Login — mobile */}
							<a
								href="https://jrassociates.themfbox.com"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2 w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm rounded-xl px-4 py-3 transition-all"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<UserCircle2 className="h-4 w-4" />
								Investor Login
								<ArrowRight className="h-3.5 w-3.5 opacity-70" />
							</a>
							<Link href="/contact#consultation" onClick={() => setIsMobileMenuOpen(false)}>
								<Button className="w-full" variant="primary-gradient">
									Book a Free Consultation
								</Button>
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
