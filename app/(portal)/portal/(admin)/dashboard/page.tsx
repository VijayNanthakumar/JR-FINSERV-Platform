"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardCard } from "../../components/DashboardCard";
import { useNotifications } from "../../context/NotificationContext";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
	MessageSquareText,
	Images,
	ImageIcon,
	Handshake,
	Quote,
	Video,
	Settings,
	Bell,
	Sparkles,
	Calendar,
	TrendingUp,
	BarChart3,
	Clock,
	CheckCircle2,
	Inbox,
	ArrowRight,
	Eye,
} from "lucide-react";
import { motion } from "framer-motion";

const cmsCards = [
	{
		title: "Enquiries",
		description: "View and manage contact form submissions",
		icon: MessageSquareText,
		href: "/portal/enquiries",
	},
	{
		title: "Hero Banners",
		description: "Manage homepage hero slider images",
		icon: Images,
		href: "/portal/content/hero",
	},
	{
		title: "Gallery",
		description: "Upload and organise photo gallery",
		icon: ImageIcon,
		href: "/portal/content/gallery",
	},
	{
		title: "Partners",
		description: "Manage partner logos and details",
		icon: Handshake,
		href: "/portal/content/partners",
	},
	{
		title: "Testimonials",
		description: "Manage client testimonials and reviews",
		icon: Quote,
		href: "/portal/content/testimonials",
	},
	{
		title: "YouTube Videos",
		description: "Manage YouTube video links and categories",
		icon: Video,
		href: "/portal/content/youtube-videos",
	},
	{
		title: "Settings",
		description: "Update website content and configuration",
		icon: Settings,
		href: "/portal/settings",
	},
];

const SERVICE_LABELS: Record<string, string> = {
	"mutual-funds": "Mutual Funds",
	lic: "LIC Insurance",
	"health-insurance": "Star Health",
	"general-insurance": "General Insurance",
};

function formatTime(isoString: string): string {
	if (!isoString) return "";
	return new Intl.DateTimeFormat("en-IN", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(isoString));
}

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "Good Morning";
	if (hour < 17) return "Good Afternoon";
	return "Good Evening";
}

export default function DashboardPage() {
	const router = useRouter();
	const { enquiries, stats, isLoading, markAsRead } = useNotifications();

	const recent5Enquiries = enquiries.slice(0, 5);

	const handleRowClick = async (id: string) => {
		await markAsRead(id);
		router.push(`/portal/enquiries/${id}`);
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Welcome & Notification Summary Banner */}
			<div className="flex flex-col gap-4">
				<div>
					<h1 className="text-xl font-bold text-navy-900 font-body">
						{getGreeting()}, Admin
					</h1>
					<p className="text-xs text-neutral-500 mt-1 font-body">
						Manage your website content, enquiries, and real-time activity from here.
					</p>
				</div>

				{/* Dynamic Notification Summary Card */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
						stats.todayCount > 0
							? "bg-blue-50/60 border-blue-200/80 text-navy-900"
							: "bg-emerald-50/60 border-emerald-200/80 text-navy-900"
					}`}
				>
					<div className="flex items-center gap-3.5">
						<div
							className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
								stats.todayCount > 0
									? "bg-blue-600 text-white border-blue-700"
									: "bg-emerald-600 text-white border-emerald-700"
							}`}
						>
							{stats.todayCount > 0 ? (
								<Bell className="h-5.5 w-5.5 animate-bounce" />
							) : (
								<Sparkles className="h-5.5 w-5.5" />
							)}
						</div>
						<div className="flex flex-col text-left">
							<span className="text-sm font-bold font-display">
								{stats.todayCount > 0
									? `🔔 You have ${stats.todayCount} new ${
											stats.todayCount === 1 ? "enquiry" : "enquiries"
									  } today.`
									: "🎉 No new enquiries today. You're all caught up!"}
							</span>
							<span className="text-xs text-neutral-600 font-body mt-0.5">
								{stats.pendingCount > 0
									? `${stats.pendingCount} pending enquiries require review.`
									: "All customer submissions have been processed."}
							</span>
						</div>
					</div>

					<Link href="/portal/enquiries" className="shrink-0 w-full sm:w-auto">
						<button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-navy-900 bg-white border border-neutral-200 px-4 py-2 rounded-xl shadow-xs hover:bg-neutral-50 transition-colors cursor-pointer">
							<span>View Enquiries</span>
							<ArrowRight className="h-3.5 w-3.5" />
						</button>
					</Link>
				</motion.div>
			</div>

			{/* 6 Realtime Statistics Widgets */}
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
				{/* Today */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							New Today
						</span>
						<div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
							<Calendar className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-navy-900 mt-2">
						{isLoading ? "-" : stats.todayCount}
					</span>
				</div>

				{/* This Week */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							This Week
						</span>
						<div className="h-7 w-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
							<TrendingUp className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-navy-900 mt-2">
						{isLoading ? "-" : stats.weekCount}
					</span>
				</div>

				{/* This Month */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							This Month
						</span>
						<div className="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
							<BarChart3 className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-navy-900 mt-2">
						{isLoading ? "-" : stats.monthCount}
					</span>
				</div>

				{/* Pending */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							Pending
						</span>
						<div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
							<Clock className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-amber-700 mt-2">
						{isLoading ? "-" : stats.pendingCount}
					</span>
				</div>

				{/* Contacted */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							Contacted
						</span>
						<div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
							<CheckCircle2 className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-emerald-700 mt-2">
						{isLoading ? "-" : stats.contactedCount}
					</span>
				</div>

				{/* Total */}
				<div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
							Total All
						</span>
						<div className="h-7 w-7 rounded-lg bg-navy-800/10 text-navy-800 flex items-center justify-center">
							<Inbox className="h-3.5 w-3.5" />
						</div>
					</div>
					<span className="text-2xl font-bold font-mono text-navy-900 mt-2">
						{isLoading ? "-" : stats.totalCount}
					</span>
				</div>
			</div>

			{/* Recent Enquiries Table Widget */}
			<div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-sm font-bold text-navy-900 font-display">
							Recent Enquiries
						</h3>
						<p className="text-xs text-neutral-500 font-body">
							Latest customer submissions across services
						</p>
					</div>

					<Link
						href="/portal/enquiries"
						className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
					>
						<span>View All</span>
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</div>

				{/* Enquiries Table */}
				<div className="overflow-x-auto rounded-xl border border-neutral-100">
					<table className="min-w-full text-xs">
						<thead>
							<tr className="bg-neutral-50 border-b border-neutral-200/80 text-left text-neutral-400 font-semibold uppercase tracking-wider">
								<th className="px-4 py-3">Customer</th>
								<th className="px-4 py-3">Phone</th>
								<th className="px-4 py-3">Service</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Received Time</th>
								<th className="px-4 py-3">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-neutral-100">
							{recent5Enquiries.length === 0 ? (
								<tr>
									<td colSpan={6} className="py-8 text-center text-neutral-400">
										No enquiries received yet.
									</td>
								</tr>
							) : (
								recent5Enquiries.map((item) => {
									const isUnread = !item.is_read || item.status === "New";
									return (
										<tr
											key={item.id}
											onClick={() => handleRowClick(item.id)}
											className={`hover:bg-neutral-50/80 transition-colors cursor-pointer ${
												isUnread ? "bg-blue-50/20 font-semibold" : ""
											}`}
										>
											<td className="px-4 py-3 text-navy-900 font-medium">
												<div className="flex items-center gap-2">
													{isUnread && (
														<span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
													)}
													<span>{item.name}</span>
												</div>
											</td>
											<td className="px-4 py-3 text-neutral-600 font-mono">
												{item.phone}
											</td>
											<td className="px-4 py-3 text-neutral-700 font-medium">
												{SERVICE_LABELS[item.service] || item.service}
											</td>
											<td className="px-4 py-3">
												<StatusBadge status={item.status} />
											</td>
											<td className="px-4 py-3 text-neutral-500 font-mono">
												{formatTime(item.created_at)}
											</td>
											<td className="px-4 py-3">
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleRowClick(item.id);
													}}
													className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-800 hover:text-blue-600 bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
												>
													<Eye className="h-3 w-3" />
													<span>View</span>
												</button>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* CMS Modules Management Grid */}
			<div className="flex flex-col gap-3">
				<h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
					Website Content & CMS Modules
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{cmsCards.map((card) => (
						<DashboardCard
							key={card.title}
							title={card.title}
							description={card.description}
							icon={card.icon}
							href={card.href}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
