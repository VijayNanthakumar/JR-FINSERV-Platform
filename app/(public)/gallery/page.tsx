"use client";

import React, { useEffect, useState } from "react";
import { PageBanner } from "@/components/common/PageBanner";
import { GalleryCard } from "@/components/cards/GalleryCard";
import { Button } from "@/components/common/Button";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/config/company";
import type { GalleryImage } from "@/types/cms";

const fallbackGalleryPhotos = [
	{
		id: "1",
		src: "/images/gallery/unnamed (1)1.jpg",
		category: "Client Events",
		title: "Annual Client Wealth Seminar 2025, Salem",
	},
	{
		id: "2",
		src: "/images/client-events/unnamed 1.jpg",
		category: "Awareness Camps",
		title: "Rural Insurance Literacy Drive, Namakkal",
	},
	{
		id: "3",
		src: "/images/office-team/unnamed.jpg",
		category: "Office & Team",
		title: `${company.name} Salem Office Advisory Desk`,
	},
	{
		id: "4",
		src: "/images/gallery/awards.jpg",
		category: "Felicitations & Awards",
		title: "Ln. V. Janarthanam receiving LIC Chairman's Club Accolade",
	},
	{
		id: "5",
		src: "/images/gallery/sg.jpg",
		category: "Client Events",
		title: "Mutual Fund Investment Workshop for Young Professionals",
	},
	{
		id: "6",
		src: "/images/client-events/award 5.jpg",
		category: "Client Events",
		title: "Interactive Investor Education and Advisory Meet",
	},
	{
		id: "7",
		src: "/images/gallery/award 2.jpg",
		category: "Felicitations & Awards",
		title: "Corporate Recognition and Financial Leadership Award",
	},
	{
		id: "8",
		src: "/images/gallery/awards.png",
		category: "Felicitations & Awards",
		title: "Strategic Advisors Felicitation Ceremony 2024",
	},
	{
		id: "9",
		src: "/images/gallery/awards 4.png",
		category: "Felicitations & Awards",
		title: "LIC MDRT Elite Advisor Honour Recognition",
	},
];

export default function GalleryPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const [visibleCount, setVisibleCount] = useState(6);
	const [cmsImages, setCmsImages] = useState<GalleryImage[]>([]);
	const [loading, setLoading] = useState(true);

	const breadcrumbItems = [{ name: "Gallery" }];

	useEffect(() => {
		async function loadGallery() {
			try {
				const res = await fetch("/api/gallery");
				const json = await res.json();
				if (json.success && json.data && json.data.length > 0) {
					// filter only active images
					const activeOnly = json.data.filter((img: GalleryImage) => img.is_active);
					setCmsImages(activeOnly);
				}
			} catch (err) {
				console.error("Failed to load CMS gallery images:", err);
			} finally {
				setLoading(false);
			}
		}
		loadGallery();
	}, []);

	// Transform CMS images or fallback photos
	const displayPhotos =
		cmsImages.length > 0
			? cmsImages.map((img) => ({
					id: img.id,
					src: img.image_url,
					category: img.category || "General",
					title: img.title || img.caption || "Gallery Photo",
			  }))
			: fallbackGalleryPhotos;

	// Dynamic Category list
	const categories = [
		{ id: "all", label: "All Photos" },
		{ id: "Client Events", label: "Client Events" },
		{ id: "Awareness Camps", label: "Awareness Camps" },
		{ id: "Office & Team", label: "Office & Team" },
		{ id: "Felicitations & Awards", label: "Felicitations & Awards" },
		{ id: "General", label: "General" },
	];

	// Filter photos by category
	const filteredPhotos = displayPhotos.filter((p) => {
		if (activeCategory === "all") return true;
		return (
			p.category.toLowerCase().replace(/[^a-z0-9]/g, "") ===
			activeCategory.toLowerCase().replace(/[^a-z0-9]/g, "")
		);
	});

	// Slice visible
	const visiblePhotos = filteredPhotos.slice(0, visibleCount);

	const handlePrev = () => {
		if (lightboxIndex !== null) {
			setLightboxIndex(lightboxIndex === 0 ? filteredPhotos.length - 1 : lightboxIndex - 1);
		}
	};

	const handleNext = () => {
		if (lightboxIndex !== null) {
			setLightboxIndex(lightboxIndex === filteredPhotos.length - 1 ? 0 : lightboxIndex + 1);
		}
	};

	const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

	return (
		<div className="flex flex-col w-full relative">
			{/* Page Banner */}
			<PageBanner
				title="Our Corporate &amp; Community Gallery"
				description="A visual register of our annual wealth seminars, financial literacy campaigns, office teams, and awards."
				breadcrumbItems={breadcrumbItems}
			/>

			{/* Category Filter Tabs */}
			<section className="py-12 bg-white border-b border-neutral-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 items-center md:items-start text-center">
					<span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
						Categories
					</span>
					<div className="flex flex-wrap justify-center md:justify-start gap-3 mt-1 overflow-x-auto w-full py-1">
						{categories.map((cat) => (
							<button
								key={cat.id}
								onClick={() => {
									setActiveCategory(cat.id);
									setVisibleCount(6); // reset pagination
								}}
								className={`h-10 px-5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
									activeCategory === cat.id
										? "bg-blue-600 border-blue-600 text-white shadow-xs"
										: "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-blue-600/30"
								}`}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Masonry image grid */}
			<section className="py-20 md:py-28 bg-neutral-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
					{loading ? (
						<div className="py-20 flex justify-center items-center">
							<Loader2 className="h-8 w-8 animate-spin text-blue-600" />
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
							<AnimatePresence mode="popLayout">
								{visiblePhotos.map((photo, index) => (
									<motion.div
										layout
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.3 }}
										key={photo.id}
									>
										<GalleryCard
											src={photo.src}
											alt={photo.title}
											title={photo.title}
											category={photo.category}
											onClick={() => setLightboxIndex(index)}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					)}

					{/* Load More Button */}
					{!loading && filteredPhotos.length > visibleCount && (
						<div className="mt-4">
							<Button
								onClick={() => setVisibleCount((prev) => prev + 3)}
								variant="secondary"
							>
								Load More Photos
							</Button>
						</div>
					)}

					{!loading && filteredPhotos.length === 0 && (
						<div className="py-16 text-center">
							<p className="text-sm text-neutral-500 font-medium">
								No images found in this category.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Lightbox Overlay Viewer */}
			<AnimatePresence>
				{lightboxIndex !== null && currentPhoto && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-xs select-none">
						{/* Close trigger clicking backdrop */}
						<div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxIndex(null)} />

						{/* Top controls header */}
						<div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between text-white z-10">
							<span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
								Image {lightboxIndex + 1} of {filteredPhotos.length}
							</span>
							<button
								onClick={() => setLightboxIndex(null)}
								className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
								aria-label="Close"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Left Navigation Arrow */}
						<button
							onClick={handlePrev}
							className="absolute left-4 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer z-10"
							aria-label="Previous image"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>

						{/* Central Image Container */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.3 }}
							className="relative w-full max-w-4xl aspect-4/3 sm:aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 z-10 pointer-events-none"
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={currentPhoto.src}
								alt={currentPhoto.title}
								className="absolute inset-0 w-full h-full object-cover"
							/>

							{/* bottom details card inside lightbox */}
							<div className="relative bg-navy-950/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-left flex flex-col gap-1">
								<span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
									{currentPhoto.category}
								</span>
								<h4 className="font-display font-semibold text-sm sm:text-base text-neutral-100">
									{currentPhoto.title}
								</h4>
							</div>
						</motion.div>

						{/* Right Navigation Arrow */}
						<button
							onClick={handleNext}
							className="absolute right-4 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer z-10"
							aria-label="Next image"
						>
							<ChevronRight className="h-6 w-6" />
						</button>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
