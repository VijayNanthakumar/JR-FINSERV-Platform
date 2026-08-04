"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxImage {
  src: string;
  alt?: string;
  /** Optional text shown at the bottom of the lightbox. Set to null/undefined to hide. */
  caption?: string | null;
  /** Optional category label above the caption. Set to null/undefined to hide. */
  category?: string | null;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onChange,
}: ImageLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const current = isOpen ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onChange]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-xs select-none">
          {/* Close trigger clicking backdrop */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Top controls header */}
          <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-0 right-0 px-4 sm:px-6 flex items-center justify-between text-white z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Image {currentIndex! + 1} of {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/10 border border-white/15 hover:bg-white/25 text-neutral-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Left Navigation Arrow */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 border border-white/15 hover:bg-white/25 text-neutral-200 hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Central Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl h-[75vh] sm:h-[80vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl z-10 pointer-events-none"
          >
            <Image
              src={current.src}
              alt={current.alt || "Image"}
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Right Navigation Arrow */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 border border-white/15 hover:bg-white/25 text-neutral-200 hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
