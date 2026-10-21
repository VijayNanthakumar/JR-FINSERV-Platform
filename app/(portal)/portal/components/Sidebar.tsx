"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
	LayoutDashboard,
	MessageSquareText,
	Images,
	ImageIcon,
	Handshake,
	Quote,
	LogOut,
	ChevronLeft,
	Globe,
	Video,
	Megaphone,
} from "lucide-react";

interface NavItem {
	label: string;
	href: string;
	icon: React.ElementType;
}

interface NavGroup {
	groupLabel: string;
	items: NavItem[];
}

const navStructure: (NavItem | NavGroup)[] = [
	{ label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
	{ label: "Enquiries", href: "/portal/enquiries", icon: MessageSquareText },
	{
		groupLabel: "Website Content",
		items: [
			{ label: "Hero Slides", href: "/portal/content/hero", icon: Images },
			{ label: "Gallery", href: "/portal/content/gallery", icon: ImageIcon },
			{ label: "Partners", href: "/portal/content/partners", icon: Handshake },
			{ label: "Testimonials", href: "/portal/content/testimonials", icon: Quote },
			{ label: "YouTube Videos", href: "/portal/content/youtube-videos", icon: Video },
			{ label: "Notices", href: "/portal/content/notices", icon: Megaphone },
		],
	},
];

function isGroup(item: NavItem | NavGroup): item is NavGroup {
	return "groupLabel" in item;
}

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();

		document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax";
		document.cookie = "sb-refresh-token=; path=/; max-age=0; SameSite=Lax";

		router.push("/portal/login");
	};

	const renderNavItem = (item: NavItem) => {
		const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
		const Icon = item.icon;
		return (
			<li key={item.href}>
				<Link
					href={item.href}
					onClick={onClose}
					className={`
						flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-colors
						${
							isActive
								? "bg-navy-800 text-white"
								: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
						}
					`}
				>
					<Icon className="h-4 w-4 shrink-0" />
					{item.label}
				</Link>
			</li>
		);
	};

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/30 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
					fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200
					flex flex-col transition-transform duration-200 ease-in-out
					lg:translate-x-0 lg:static lg:z-auto
					${isOpen ? "translate-x-0" : "-translate-x-full"}
				`}
			>
				{/* Brand */}
				<div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200 shrink-0">
					<Link
						href="/portal/dashboard"
						className="text-sm font-semibold text-navy-800 tracking-wide font-body"
					>
						JR FINSERV
						<span className="ml-1.5 text-[11px] font-normal text-neutral-400 tracking-normal">
							Admin
						</span>
					</Link>
					<button
						onClick={onClose}
						className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded hover:bg-neutral-100 lg:hidden cursor-pointer"
						aria-label="Close sidebar"
					>
						<ChevronLeft className="h-4 w-4 text-neutral-500" />
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto py-4 px-3">
					<ul className="space-y-1">
						{navStructure.map((entry) => {
							if (isGroup(entry)) {
								return (
									<li key={entry.groupLabel}>
										{/* Group label */}
										<div className="flex items-center gap-2 px-3 pt-4 pb-1.5">
											<Globe className="h-3 w-3 text-neutral-400 shrink-0" />
											<span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
												{entry.groupLabel}
											</span>
										</div>
										<ul className="space-y-0.5">
											{entry.items.map(renderNavItem)}
										</ul>
									</li>
								);
							}
							return renderNavItem(entry);
						})}
					</ul>
				</nav>

				{/* Logout */}
				<div className="px-3 pb-4 border-t border-neutral-200 pt-4 shrink-0">
					<button
						onClick={handleLogout}
						className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
					>
						<LogOut className="h-4 w-4 shrink-0" />
						Logout
					</button>
				</div>
			</aside>
		</>
	);
}
