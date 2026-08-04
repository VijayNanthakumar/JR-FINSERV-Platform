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
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-300 ${
        type === "success" ? "bg-emerald-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}

const GALLERY_CATEGORIES = [
  "Client Events",
  "Awareness Camps",
  "Office & Team",
  "Felicitations & Awards",
  "General",
];

interface ImageCardEditProps {
  image: GalleryImage;
  onUpdate: (updated: Partial<GalleryImage>) => Promise<void>;
  onDelete: () => Promise<void>;
}

function ImageCard({ image, onUpdate, onDelete }: ImageCardEditProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(image.title ?? image.caption ?? "");
  const [description, setDescription] = useState(image.description ?? "");
  const [category, setCategory] = useState(image.category ?? "General");
  const [displayOrder, setDisplayOrder] = useState(image.display_order ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate({
      title: title || null,
      caption: title || null,
      alt_text: title || null,
      description: description || null,
      category: category || null,
      display_order: displayOrder,
    });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Image Display */}
        <div className="relative aspect-video bg-neutral-100 overflow-hidden">
          <Image
            src={image.image_url}
            alt={image.title ?? image.caption ?? "Gallery image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Active status indicator dot */}
          <div
            className={`absolute top-2.5 left-2.5 h-2.5 w-2.5 rounded-full ${
              image.is_active ? "bg-emerald-500 ring-2 ring-white" : "bg-neutral-400"
            } shadow-sm`}
          />
          {image.category && (
            <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
              {image.category}
            </span>
          )}
        </div>

        {/* Card Body & Form */}
        <div className="p-3.5 flex flex-col gap-2">
          {editing ? (
            <div className="flex flex-col gap-2 text-left">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Title
                </label>
                <input
                  className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full mt-0.5"
                  placeholder="Image Title…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Category
                </label>
                <select
                  className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full bg-white mt-0.5"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={2}
                  className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full mt-0.5"
                  placeholder="Description…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Display Order
                </label>
                <input
                  type="number"
                  min={0}
                  className="text-xs border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 w-full mt-0.5"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-1.5 text-xs font-semibold bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
                >
                  {saving && <Loader2 className="h-3 w-3 animate-spin" />}
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-xs text-navy-900 truncate">
                {image.title || image.caption || "Untitled Image"}
              </h4>
              {image.description && (
                <p className="text-[11px] text-neutral-500 line-clamp-2 font-body font-light">
                  {image.description}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Card Controls Footer */}
      {!editing && (
        <div className="px-3.5 pb-3 pt-1 border-t border-neutral-100 flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <StatusToggle
              active={image.is_active}
              onChange={(val) => onUpdate({ is_active: val })}
            />
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
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
      )}
    </div>
  );
}

export default function GalleryCmsPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
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
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setImages(json.data ?? []);
    } catch {
      showToast("Failed to load gallery.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

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
        if (!uploadJson.success) {
          failCount++;
          continue;
        }

        const rawTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

        const createRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: uploadJson.url,
            title: rawTitle,
            caption: rawTitle,
            alt_text: rawTitle,
            category: "General",
            display_order: images.length + successCount,
            is_active: true,
          }),
        });
        const createJson = await createRes.json();
        if (createJson.success) successCount++;
        else failCount++;
      } catch {
        failCount++;
      }
    }

    setUploading(false);
    if (successCount > 0)
      showToast(`${successCount} image${successCount > 1 ? "s" : ""} uploaded.`, "success");
    if (failCount > 0)
      showToast(`${failCount} upload${failCount > 1 ? "s" : ""} failed.`, "error");
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

  const filtered = images.filter((img) => {
    const matchesSearch =
      !search ||
      (img.title?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (img.caption?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (img.description?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const matchesCat =
      categoryFilter === "All" || (img.category ?? "General") === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={ImageIcon}
        title="Gallery"
        description="Manage the photo gallery. All active gallery images appear exclusively on the /gallery page."
        action={
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
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

      {/* Filter and Search Bar */}
      {images.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchBar
            placeholder="Search by title or description…"
            value={search}
            onChange={setSearch}
            className="max-w-xs"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
            >
              <option value="All">All Categories</option>
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <LoadingGrid cols={3} rows={2} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title={search || categoryFilter !== "All" ? "No images match your filter" : "No gallery images yet"}
          description={
            search || categoryFilter !== "All"
              ? "Try adjusting your search or category filter."
              : "Upload your first photos to populate the /gallery page."
          }
          action={
            !search && categoryFilter === "All" ? (
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
