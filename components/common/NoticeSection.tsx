"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const ImageLightbox = dynamic(
  () => import("@/components/common/ImageLightbox").then((mod) => mod.ImageLightbox),
);
import type { Notice } from "@/types/cms";
import { motion } from "framer-motion";

interface NoticeSectionProps {
  notices: Notice[];
  /** Section background class. Default: bg-neutral-50 */
  bgClassName?: string;
}

export function NoticeSection({
  notices,
  bgClassName = "bg-neutral-50 border-b border-neutral-200",
}: NoticeSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!notices || notices.length === 0) return null;

  // Build lightbox images — image-only, no text
  const lightboxImages = notices.map((n) => ({
    src: n.image_url,
    alt: "Notice poster",
  }));

  return (
    <section className={`py-20 md:py-28 ${bgClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            NOTICES &amp; UPDATES
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
            Latest Notices
          </h2>
          <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto font-body">
            Important service announcements, campaign offers, and promotional updates.
          </p>
        </div>

        {/* Poster Grid — image only, no text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`View notice poster ${index + 1}`}
              >
                <div className="relative aspect-[3/4] bg-neutral-100">
                  <Image
                    src={notice.image_url}
                    alt="Notice poster"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Lightbox — image only, no text overlay */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  );
}
