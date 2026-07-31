import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/common/ServiceDetailContent";
import type { Metadata } from "next";
import { company } from "@/config/company";
import { getActiveYouTubeVideos, getActivePartners, getActiveNotices } from "@/lib/cms-data";

interface PageProps {
	params: Promise<{ slug: string }>;
}

const serviceNames: Record<string, string> = {
	"mutual-funds": "Mutual Funds Advisory",
	lic: "LIC Life Insurance Advisory",
	"health-insurance": "Star Health Insurance Plans",
	"general-insurance": "General Insurance Solutions",
};

const slugToCategory: Record<string, string> = {
	"mutual-funds": "Mutual Funds",
	lic: "LIC",
	"health-insurance": "Health Insurance",
	"general-insurance": "General Insurance",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const name = serviceNames[slug] || "Financial Services";
	return {
		title: `${name} | ${company.name}`,
		description: `Professional and compliant ${name} planning and advisory from ${company.name}. Secure your savings and calculate rates.`,
	};
}

export default async function ServiceDetailsPage({ params }: PageProps) {
	const { slug } = await params;

	// Check if valid slug
	if (!serviceNames[slug]) {
		notFound();
	}

	const category = slugToCategory[slug] || "Other";
	const [videos, cmsPartners, notices] = await Promise.all([
		getActiveYouTubeVideos(category),
		getActivePartners(),
		getActiveNotices(category),
	]);

	return <ServiceDetailContent slug={slug} videos={videos} cmsPartners={cmsPartners} notices={notices} />;
}

// Generate static routes during compilation
export async function generateStaticParams() {
	return [
		{ slug: "mutual-funds" },
		{ slug: "lic" },
		{ slug: "health-insurance" },
		{ slug: "general-insurance" },
	];
}
