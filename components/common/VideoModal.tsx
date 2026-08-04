"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
  title?: string;
}

export function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) return null;

  const embedUrl = getYouTubeEmbedUrl(videoId, true);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/90 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-4xl bg-navy-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy-950/50">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-lg font-display">
              {title || "Watch Video"}
            </h3>
            <button
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/10 border border-white/15 hover:bg-white/25 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Player Responsive Iframe */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title={title || "YouTube Video Player"}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
