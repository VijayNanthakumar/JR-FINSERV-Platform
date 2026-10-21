"use client";

import React, { useState, useRef, useEffect } from "react";
import {
	Menu,
	Bell,
	Volume2,
	VolumeX,
	CheckCheck,
	Clock,
	ArrowRight,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotifications } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";

interface PortalHeaderProps {
	onMenuToggle: () => void;
}

const SERVICE_LABELS: Record<string, string> = {
	"mutual-funds": "Mutual Funds",
	lic: "LIC Insurance",
	"health-insurance": "Star Health",
	"general-insurance": "General Insurance",
};

function formatTimeAgo(isoString: string): string {
	if (!isoString) return "";
	const date = new Date(isoString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMins < 1) return "Just now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays === 1) return "Yesterday";
	return `${diffDays}d ago`;
}

export function PortalHeader({ onMenuToggle }: PortalHeaderProps) {
	const router = useRouter();
	const {
		enquiries,
		unreadCount,
		soundEnabled,
		setSoundEnabled,
		markAsRead,
		markAllAsRead,
	} = useNotifications();

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Show recent 5 enquiries in notification dropdown
	const recentDropdownEnquiries = enquiries.slice(0, 6);

	const handleEnquiryClick = async (id: string) => {
		await markAsRead(id);
		setDropdownOpen(false);
		router.push(`/portal/enquiries/${id}`);
	};

	return (
		<header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-30">
			<div className="flex items-center gap-3">
				<button
					onClick={onMenuToggle}
					className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2 rounded-lg hover:bg-neutral-100 lg:hidden text-neutral-600 cursor-pointer"
					aria-label="Toggle sidebar"
				>
					<Menu className="h-5 w-5" />
				</button>

				<div className="flex items-center gap-2">
					<h1 className="text-sm font-bold text-navy-900 font-body">
						Admin Portal
					</h1>
					<span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
						LIVE REALTIME
					</span>
				</div>
			</div>

			{/* Right Header Actions */}
			<div className="flex items-center gap-3">
				{/* Audio Sound Toggle Button */}
				<button
					onClick={() => setSoundEnabled(!soundEnabled)}
					title={soundEnabled ? "Mute notification chime" : "Unmute notification chime"}
					className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
						soundEnabled
							? "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
							: "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
					}`}
				>
					{soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
				</button>

				{/* Notification Bell Dropdown */}
				<div className="relative" ref={dropdownRef}>
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className={`relative p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
							unreadCount > 0
								? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
								: "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
						}`}
						aria-label="View notifications"
					>
						<Bell className="h-4 w-4" />

						{/* Red Pulsing Dot & Badge */}
						{unreadCount > 0 && (
							<span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
								<span className="relative z-10">{unreadCount > 99 ? "99+" : unreadCount}</span>
							</span>
						)}
					</button>

					{/* Notification Dropdown Panel */}
					<AnimatePresence>
						{dropdownOpen && (
							<motion.div
								initial={{ opacity: 0, y: 8, scale: 0.96 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 8, scale: 0.96 }}
								transition={{ duration: 0.15, ease: "easeOut" }}
								className="absolute -right-2 sm:right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden z-50"
							>
								{/* Dropdown Header */}
								<div className="p-4 border-b border-neutral-100 bg-neutral-50/80 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Bell className="h-4 w-4 text-blue-600" />
										<span className="font-display font-bold text-sm text-navy-900">
											Enquiry Notifications
										</span>
										{unreadCount > 0 && (
											<span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
												{unreadCount} new
											</span>
										)}
									</div>
									{unreadCount > 0 && (
										<button
											onClick={markAllAsRead}
											className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
										>
											<CheckCheck className="h-3.5 w-3.5" />
											Mark all read
										</button>
									)}
								</div>

								{/* Notification Items List */}
								<div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
									{recentDropdownEnquiries.length === 0 ? (
										<div className="p-8 text-center flex flex-col items-center justify-center gap-2">
											<Sparkles className="h-8 w-8 text-emerald-500 opacity-60" />
											<p className="text-xs font-semibold text-neutral-700">🎉 All caught up!</p>
											<p className="text-[11px] text-neutral-400 font-body">No new enquiries received.</p>
										</div>
									) : (
										recentDropdownEnquiries.map((item) => {
											const isUnread = !item.is_read || item.status === "New";
											return (
												<div
													key={item.id}
													onClick={() => handleEnquiryClick(item.id)}
													className={`p-3.5 flex items-start gap-3 hover:bg-neutral-50 transition-colors cursor-pointer group ${
														isUnread ? "bg-blue-50/30" : ""
													}`}
												>
													{/* Indicator Dot */}
													<span
														className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1.5 ${
															isUnread ? "bg-red-500 shadow-xs" : "bg-neutral-300"
														}`}
													/>

													<div className="flex flex-col min-w-0 flex-1 gap-1">
														<div className="flex items-center justify-between gap-2">
															<span className="font-bold text-xs text-navy-900 group-hover:text-blue-600 truncate">
																{item.name}
															</span>
															<span className="text-[10px] text-neutral-400 shrink-0 font-mono flex items-center gap-1">
																<Clock className="h-3 w-3" />
																{formatTimeAgo(item.created_at)}
															</span>
														</div>

														<div className="flex items-center justify-between gap-2 text-[11px]">
															<span className="text-neutral-500 font-medium truncate">
																{SERVICE_LABELS[item.service] || item.service}
															</span>
															<span
																className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
																	item.status === "New"
																		? "bg-amber-100 text-amber-800"
																		: item.status === "Contacted"
																		? "bg-blue-100 text-blue-800"
																		: "bg-emerald-100 text-emerald-800"
																}`}
															>
																{item.status}
															</span>
														</div>
													</div>
												</div>
											);
										})
									)}
								</div>

								{/* Dropdown Footer */}
								<div className="p-3 bg-neutral-50 border-t border-neutral-100 text-center">
									<Link
										href="/portal/enquiries"
										onClick={() => setDropdownOpen(false)}
										className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
									>
										<span>View All Enquiries</span>
										<ArrowRight className="h-3.5 w-3.5" />
									</Link>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	);
}
