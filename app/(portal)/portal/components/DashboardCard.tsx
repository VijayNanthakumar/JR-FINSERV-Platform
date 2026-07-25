import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	count?: number;
	href?: string;
}

export function DashboardCard({ title, description, icon: Icon, count, href }: DashboardCardProps) {
	const content = (
		<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
			<div className="flex items-start justify-between mb-3">
				<div className="h-10 w-10 rounded-lg bg-navy-800/5 flex items-center justify-center group-hover:bg-navy-800/10 transition-colors">
					<Icon className="h-5 w-5 text-navy-800" />
				</div>
				{typeof count === "number" && (
					<span className="text-2xl font-semibold text-navy-800 font-body tabular-nums">
						{count}
					</span>
				)}
			</div>
			<h3 className="text-sm font-semibold text-neutral-900 font-body group-hover:text-navy-800 transition-colors">
				{title}
			</h3>
			<p className="text-xs text-neutral-500 mt-1 font-body leading-relaxed">{description}</p>
		</div>
	);

	if (href) {
		return (
			<Link href={href} className="block no-underline">
				{content}
			</Link>
		);
	}

	return content;
}
