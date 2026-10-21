"use client";

import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { PortalHeader } from "../components/PortalHeader";
import { NotificationProvider } from "../context/NotificationContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<NotificationProvider>
			<div className="flex h-screen overflow-hidden bg-neutral-50">
				<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

				<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
					<PortalHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

					<main className="flex-1 overflow-y-auto p-4 lg:p-6">
						{children}
					</main>
				</div>
			</div>
		</NotificationProvider>
	);
}
