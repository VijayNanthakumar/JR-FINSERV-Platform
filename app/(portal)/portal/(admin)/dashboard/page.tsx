import { DashboardCard } from "../../components/DashboardCard";
import {
	MessageSquareText,
	Images,
	ImageIcon,
	Handshake,
	Quote,
	Video,
	Settings,
} from "lucide-react";

const cards = [
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

export default function DashboardPage() {
	return (
		<div>
			{/* Welcome */}
			<div className="mb-6">
				<h1 className="text-lg font-semibold text-neutral-900 font-body">
					Welcome, Admin
				</h1>
				<p className="text-sm text-neutral-500 mt-1 font-body">
					Manage your website content from here.
				</p>
			</div>

			{/* Cards Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{cards.map((card) => (
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
	);
}
