/**
 * services-list.ts
 *
 * Shared services data.
 * Imported by both Navbar (client) and ServicesSection (client).
 * Must remain a module with no "use client" — but the CONSUMERS
 * that render Lucide icons must be Client Components.
 */

import {
	TrendingUp,
	ShieldCheck,
	HeartPulse,
	Home,
	Car,
} from "lucide-react";

export const servicesList = [
	{
		name: "Mutual Funds",
		href: "/services/mutual-funds",
		description: "Expert mutual fund advisory to grow your wealth with compound returns.",
		icon: TrendingUp,
		bgColor: "bg-emerald-100",
		iconColor: "text-emerald-600",
	},
	{
		name: "LIC (Life Insurance)",
		href: "/services/lic",
		description: "Secure your family's future with government-backed life protection.",
		icon: ShieldCheck,
		bgColor: "bg-navy-100",
		iconColor: "text-navy-700",
	},
	{
		name: "Star Health Insurance",
		href: "/services/health-insurance",
		description: "Comprehensive medical coverages with top-tier network hospitals.",
		icon: HeartPulse,
		bgColor: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		name: "General Insurance",
		href: "/services/general-insurance",
		description: "Protect your commercial and personal assets from unexpected liabilities.",
		icon: Home,
		bgColor: "bg-amber-100/60",
		iconColor: "text-amber-600",
	},
	{
		name: "Vehicle Insurance",
		href: "/services/vehicle-insurance",
		description: "Stress-free insurance for your cars and two-wheelers with instant claims.",
		icon: Car,
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
	},
];
