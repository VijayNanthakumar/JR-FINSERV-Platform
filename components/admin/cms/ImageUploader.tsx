"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  bucket: "hero" | "gallery" | "partners" | "testimonials";
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  hint?: string;
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "auto";
}

export function ImageUploader({
  bucket,
  currentUrl,
  onUpload,
  onRemove,
  label = "Upload Image",
  hint = "JPEG, PNG, WebP up to 5 MB",
  className = "",
  aspectRatio = "landscape",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const aspectClass = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "min-h-[160px]",
  }[aspectRatio];

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("bucket", bucket);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();

        if (!res.ok || !json.success) {
          setError(json.message ?? "Upload failed.");
        } else {
          onUpload(json.url);
        }
      } catch {
        setError("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [bucket, onUpload]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          {label}
        </span>
      )}

      {/* Preview or dropzone */}
      <div
        className={`relative w-full ${aspectClass} rounded-xl border-2 overflow-hidden transition-all duration-200 cursor-pointer ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : currentUrl
              ? "border-neutral-200 bg-neutral-50"
              : "border-dashed border-neutral-300 bg-neutral-50 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        {currentUrl ? (
          <>
            <Image
              src={currentUrl}
              alt="Preview"
              fill
              className="object-contain"
              sizes="400px"
            />
            {/* overlay actions */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center gap-3 opacity-0 hover:opacity-100">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="flex items-center gap-1.5 bg-white/90 text-navy-800 text-xs font-semibold px-3 py-2 rounded-lg shadow hover:bg-white transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Replace
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onRemove(); }}
                  className="flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow hover:bg-red-500 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            {uploading ? (
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
                <ImageIcon className="h-6 w-6 text-neutral-400" />
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-600">
                {uploading ? "Uploading…" : "Click or drag to upload"}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{hint}</p>
            </div>
          </div>
        )}

        {uploading && currentUrl && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
}
