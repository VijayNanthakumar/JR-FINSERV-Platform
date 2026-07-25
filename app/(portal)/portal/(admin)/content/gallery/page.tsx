"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { ImageIcon, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingGrid } from "@/components/admin/cms/LoadingState";
import { SearchBar } from "@/components/admin/cms/SearchBar";
import type { GalleryImage } from "@/types/cms";

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-300 ${type === "success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {message}
    </div>
  );
}

interface ImageCardEditProps {
  image: GalleryImage;
  onUpdate: (updated: Partial<GalleryImage>) => void;
  onDelete: () => Promise<void>;
}

function ImageCard({ image, onUpdate, onDelete }: ImageCardEditProps) {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(image.caption ?? "");
  const [altText, setAltText] = useState(image.alt_text ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate({ caption: caption || null, alt_text: altText || null });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Image */}
      <div className="relative aspect-video bg-neutral-100">
        <Image
          src={image.image_url}
          alt={image.alt_text ?? image.caption ?? "Gallery image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Active badge */}
        <div className={`absolute top-2 left-2 h-2 w-2 rounded-full ${image.is_active ? "bg-emerald-500" : "bg-neutral-400"} shadow`} />
      </div>

      {/* Meta */}
      <div className="p-3 flex flex-col gap-2">
        {editing ? (
          <>
            <input
              className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full"
              placeholder="Caption…"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full"
              placeholder="Alt text…"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-1.5 text-xs font-semibold bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                Save
              </button>
              <button onClick={() => setEditing(false)} className="flex-1 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-neutral-600 truncate min-h-[16px]">{image.caption || <span className="text-neutral-300 italic">No caption</span>}</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <StatusToggle
                  active={image.is_active}
                  onChange={(val) => onUpdate({ is_active: val })}
                />
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Edit
                </button>
              </div>
              <DeleteDialog
                label=""
                message="Delete this image permanently?"
                onConfirm={onDelete}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function GalleryCmsPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success) setImages(json.data ?? []);
    } catch {
      showToast("Failed to load gallery.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleFilesUpload = async (files: FileList) => {
    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("bucket", "gallery");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        const uploadJson = await uploadRes.json();
        if (!uploadJson.success) { failCount++; continue; }

        const createRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: uploadJson.url,
            caption: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            alt_text: file.name.replace(/\.[^/.]+$/, ""),
            display_order: images.length + successCount,
          }),
        });
        const createJson = await createRes.json();
        if (createJson.success) successCount++; else failCount++;
      } catch {
        failCount++;
      }
    }

    setUploading(false);
    if (successCount > 0) showToast(`${successCount} image${successCount > 1 ? "s" : ""} uploaded.`, "success");
    if (failCount > 0) showToast(`${failCount} upload${failCount > 1 ? "s" : ""} failed.`, "error");
    fetchImages();
  };

  const handleUpdate = async (id: string, updates: Partial<GalleryImage>) => {
    try {
      await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      fetchImages();
    } catch {
      showToast("Update failed.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    showToast("Image deleted.", "success");
    fetchImages();
  };

  const filtered = images.filter(
    (img) =>
      !search ||
      (img.caption?.toLowerCase().includes(search.toLowerCase()) ||
        img.alt_text?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={ImageIcon}
        title="Gallery"
        description="Manage the photo gallery. Active images appear on the homepage."
        action={
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload Images"}
          </button>
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
      />

      {/* Search */}
      {images.length > 0 && (
        <SearchBar
          placeholder="Search by caption or alt text…"
          value={search}
          onChange={setSearch}
          className="max-w-xs"
        />
      )}

      {/* Grid */}
      {loading ? (
        <LoadingGrid cols={3} rows={2} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title={search ? "No images match your search" : "No gallery images yet"}
          description={search ? "Try a different search term." : "Upload your first images to get started."}
          action={
            !search ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Images
              </button>
            ) : undefined
          }
        />
      ) : (
        <ContentCard noPadding>
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-600">
              {filtered.length} image{filtered.length !== 1 ? "s" : ""}
              {search && ` matching "${search}"`}
            </span>
          </div>
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  onUpdate={(updates) => handleUpdate(img.id, updates)}
                  onDelete={() => handleDelete(img.id)}
                />
              ))}
            </div>
          </div>
        </ContentCard>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
