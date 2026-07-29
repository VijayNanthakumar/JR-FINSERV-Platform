"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { createClientSupabaseClient } from "@/lib/supabase";
import type { Enquiry, EnquiryStats } from "@/types/enquiry";

interface NotificationContextType {
	enquiries: Enquiry[];
	stats: EnquiryStats;
	unreadCount: number;
	isLoading: boolean;
	soundEnabled: boolean;
	setSoundEnabled: (enabled: boolean) => void;
	markAsRead: (id: string) => Promise<void>;
	markAllAsRead: () => Promise<void>;
	refresh: () => Promise<void>;
	requestBrowserPermission: () => Promise<void>;
}

const defaultStats: EnquiryStats = {
	todayCount: 0,
	weekCount: 0,
	monthCount: 0,
	pendingCount: 0,
	contactedCount: 0,
	closedCount: 0,
	totalCount: 0,
	unreadCount: 0,
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Web Audio API Chime Synthesis
function playNotificationChime() {
	try {
		const AudioContextClass =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		if (!AudioContextClass) return;
		const ctx = new AudioContextClass();

		// Osc 1 (Higher chime tone)
		const osc1 = ctx.createOscillator();
		const gain1 = ctx.createGain();
		osc1.type = "sine";
		osc1.frequency.setValueAtTime(880, ctx.currentTime);
		osc1.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15);
		gain1.gain.setValueAtTime(0.15, ctx.currentTime);
		gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
		osc1.connect(gain1);
		gain1.connect(ctx.destination);
		osc1.start();
		osc1.stop(ctx.currentTime + 0.35);

		// Osc 2 (Subtle harmonic undertone)
		const osc2 = ctx.createOscillator();
		const gain2 = ctx.createGain();
		osc2.type = "sine";
		osc2.frequency.setValueAtTime(587.33, ctx.currentTime + 0.1);
		gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.1);
		gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
		osc2.connect(gain2);
		gain2.connect(ctx.destination);
		osc2.start(ctx.currentTime + 0.1);
		osc2.stop(ctx.currentTime + 0.4);
	} catch (e) {
		console.error("[AudioChime] Error playing sound:", e);
	}
}

function triggerBrowserNotification(enquiry: Enquiry) {
	if (typeof window === "undefined" || !("Notification" in window)) return;
	if (Notification.permission === "granted") {
		try {
			new Notification("New Enquiry Received — JR FINSERV", {
				body: `${enquiry.name} • ${enquiry.service}\nPhone: ${enquiry.phone}`,
				icon: "/images/logo/logo.jpeg",
			});
		} catch (e) {
			console.error("[Notification] Error triggering browser notification:", e);
		}
	}
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
	const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
	const [stats, setStats] = useState<EnquiryStats>(defaultStats);
	const [isLoading, setIsLoading] = useState(true);
	const [soundEnabled, setSoundEnabledState] = useState(true);
	const soundEnabledRef = useRef(soundEnabled);

	useEffect(() => {
		soundEnabledRef.current = soundEnabled;
	}, [soundEnabled]);

	// Load sound preference from localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("jr_finserv_notification_sound");
			if (saved !== null) {
				setSoundEnabledState(saved === "true");
			}
		}
	}, []);

	const setSoundEnabled = (enabled: boolean) => {
		setSoundEnabledState(enabled);
		if (typeof window !== "undefined") {
			localStorage.setItem("jr_finserv_notification_sound", String(enabled));
		}
	};

	const requestBrowserPermission = async () => {
		if (typeof window !== "undefined" && "Notification" in window) {
			if (Notification.permission === "default") {
				await Notification.requestPermission();
			}
		}
	};

	// Fetch enquiries + stats
	const fetchEnquiriesAndStats = useCallback(async () => {
		try {
			const res = await fetch("/api/enquiries");
			if (!res.ok) return;
			const data = await res.json();
			if (data.success) {
				setEnquiries(data.enquiries ?? []);
				setStats(data.stats ?? defaultStats);
			}
		} catch (err) {
			console.error("[NotificationContext] Error fetching enquiries:", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchEnquiriesAndStats();
		requestBrowserPermission();
	}, [fetchEnquiriesAndStats]);

	// Supabase Realtime Subscription
	useEffect(() => {
		const supabase = createClientSupabaseClient();

		const channel = supabase
			.channel("portal-enquiries-realtime")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "enquiries" },
				(payload: { eventType: string; new: Record<string, unknown> }) => {
					fetchEnquiriesAndStats();

					if (payload.eventType === "INSERT") {
						const newRow = payload.new as unknown as Enquiry;
						if (soundEnabledRef.current) {
							playNotificationChime();
						}
						triggerBrowserNotification(newRow);
					}
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [fetchEnquiriesAndStats]);

	const markAsRead = async (id: string) => {
		// Optimistic update
		setEnquiries((prev) =>
			prev.map((e) => (e.id === id ? { ...e, is_read: true } : e))
		);
		setStats((prev) => ({
			...prev,
			unreadCount: Math.max(0, prev.unreadCount - 1),
		}));

		try {
			await fetch(`/api/enquiries/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ is_read: true }),
			});
			fetchEnquiriesAndStats();
		} catch (err) {
			console.error("[NotificationContext] Error marking as read:", err);
		}
	};

	const markAllAsRead = async () => {
		const unreadItems = enquiries.filter((e) => !e.is_read || e.status === "New");
		setEnquiries((prev) => prev.map((e) => ({ ...e, is_read: true })));
		setStats((prev) => ({ ...prev, unreadCount: 0 }));

		try {
			await Promise.all(
				unreadItems.map((item) =>
					fetch(`/api/enquiries/${item.id}`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ is_read: true }),
					})
				)
			);
			fetchEnquiriesAndStats();
		} catch (err) {
			console.error("[NotificationContext] Error marking all as read:", err);
		}
	};

	return (
		<NotificationContext.Provider
			value={{
				enquiries,
				stats,
				unreadCount: stats.unreadCount,
				isLoading,
				soundEnabled,
				setSoundEnabled,
				markAsRead,
				markAllAsRead,
				refresh: fetchEnquiriesAndStats,
				requestBrowserPermission,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotifications must be used within a NotificationProvider");
	}
	return context;
}
