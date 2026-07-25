"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Card } from "@/components/common/Card";
import { VideoModal } from "@/components/common/VideoModal";
import type { YouTubeVideo } from "@/types/cms";
import { extractYouTubeId, getYouTubeThumbnailUrl } from "@/lib/youtube";

interface YouTubeVideoSectionProps {
  videos: YouTubeVideo[];
  badgeText?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  bgClassName?: string;
}

export function YouTubeVideoSection({
  videos,
  badgeText = "VIDEO STORIES",
  sectionTitle = "What Our Customers Say",
  sectionSubtitle = "Watch short video testimonials from clients sharing their long-term advisory experience.",
  bgClassName = "bg-neutral-50 border-b border-neutral-200",
}: YouTubeVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <>
      <section className={`py-20 md:py-28 ${bgClassName}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            {badgeText}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mb-8 font-body">
              {sectionSubtitle}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-2">
            {videos.map((video) => {
              const videoId = extractYouTubeId(video.youtube_url);
              const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : "";

              return (
                <Card
                  key={video.id}
                  variant="resting"
                  hoverEffect
                  className="overflow-hidden p-0 border-neutral-200/80 rounded-2xl flex flex-col justify-between h-full group"
                >
                  <div className="relative w-full h-[210px] overflow-hidden bg-navy-950 border-b border-neutral-200 shrink-0">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {
                          if (videoId) {
                            (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/0.jpg`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-navy-900 text-neutral-400">
                        <Play className="h-10 w-10 opacity-50" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                      <button
                        onClick={() => videoId && setSelectedVideo({ id: videoId, title: video.title })}
                        aria-label={`Play video: ${video.title}`}
                        className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 cursor-pointer"
                      >
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </button>
                    </div>

                    <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      YouTube
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-1 flex-1 justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {video.category || "Verified Client Video"}
                    </span>
                    <h3 className="font-display font-bold text-base text-navy-900 truncate mt-1">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-xs text-neutral-500 font-body font-light mt-0.5 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.id ?? null}
        title={selectedVideo?.title}
      />
    </>
  );
}
