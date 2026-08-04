"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Megaphone, Upload, Loader2, GripVertical } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingGrid } from "@/components/admin/cms/LoadingState";
import { NOTICE_CATEGORIES, type Notice } from "@/types/cms";

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

interface NoticeCardEditProps {
  notice: Notice;
  onUpdate: (updated: Partial<Notice>) => Promise<void>;
  onDelete: () => Promise<void>;
  isDragging?: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
}

function NoticeCard({
  notice,
  onUpdate,
  onDelete,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
}: NoticeCardEditProps) {
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState(notice.service_category);
  const [displayOrder, setDisplayOrder] = useState(notice.display_order);
  const [saving, setSaving] = useState(false);
  const [replacingImage, setReplacingImage] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate({
      service_category: category,
      display_order: displayOrder,
    });
    setSaving(false);
    setEditing(false);
  };

  const handleReplaceImage = async (file: File) => {
    setReplacingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "notices");
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const uploadJson = await uploadRes.json();
      if (uploadJson.success) {
        await onUpdate({ image_url: uploadJson.url });
      }
    } catch {
      // Error handled by parent
    } finally {
      setReplacingImage(false);
    }
  };

  const createdDate = new Date(notice.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      draggable={!editing}
      onDragStart={(e) => onDragStart(e, notice.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, notice.id)}
      className={`group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
      <div>
        {/* Image Display */}
        <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
          <Image
            src={notice.image_url}
            alt="Notice poster"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Active status indicator dot */}
          <div
            className={`absolute top-2.5 left-2.5 h-2.5 w-2.5 rounded-full ${
              notice.is_active ? "bg-emerald-500 ring-2 ring-white" : "bg-neutral-400"
            } shadow-sm`}
          />
          {/* Drag handle */}
          {!editing && (
            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          {/* Category badge */}
          <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
            {notice.service_category}
          </span>
          {/* Replace image overlay */}
          {replacingImage && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Card Body & Form */}
        <div className="p-3.5 flex flex-col gap-2">
          {editing ? (
            <div className="flex flex-col gap-2 text-left">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Service Category
                </label>
                <select
                  className="text-xs border border-neutral-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full bg-white mt-0.5"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {NOTICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Replace Image
                </label>
                <input
                  ref={replaceInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleReplaceImage(file);
                  }}
                />
                <button
                  onClick={() => replaceInputRef.current?.click()}
                  disabled={replacingImage}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer mt-0.5"
                >
                  {replacingImage ? "Uploading…" : "Choose new image"}
                </button>
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
                  onClick={() => {
                    setCategory(notice.service_category);
                    setDisplayOrder(notice.display_order);
                    setEditing(false);
                  }}
                  className="flex-1 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Order: {notice.display_order}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {createdDate}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Card Controls Footer */}
      {!editing && (
        <div className="px-3.5 pb-3 pt-1 border-t border-neutral-100 flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <StatusToggle
              active={notice.is_active}
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
            message="Delete this notice poster permanently?"
            onConfirm={onDelete}
          />
        </div>
      )}
    </div>
  );
}

export default function NoticesCmsPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notices", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setNotices(json.data ?? []);
    } catch {
      showToast("Failed to load notices.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  // ─── Multi-file upload ──────────────────────────────────────────────────────
  const handleFilesUpload = async (files: FileList) => {
    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    let lastErrorMsg = "";

    for (const file of Array.from(files)) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("bucket", "notices");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        const uploadJson = await uploadRes.json();
        if (!uploadJson.success) {
          failCount++;
          lastErrorMsg = uploadJson.message || "File upload failed";
          continue;
        }

        const createRes = await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: uploadJson.url,
            service_category: "All Services",
            display_order: notices.length + successCount,
            is_active: true,
          }),
        });
        const createJson = await createRes.json();
        if (createJson.success) {
          successCount++;
        } else {
          failCount++;
          lastErrorMsg = createJson.message || "Database insert failed";
        }
      } catch (err: unknown) {
        failCount++;
        lastErrorMsg = err instanceof Error ? err.message : "Network error";
      }
    }

    setUploading(false);
    if (successCount > 0)
      showToast(`${successCount} notice${successCount > 1 ? "s" : ""} uploaded.`, "success");
    if (failCount > 0)
      showToast(lastErrorMsg ? `Upload error: ${lastErrorMsg}` : `${failCount} upload${failCount > 1 ? "s" : ""} failed.`, "error");
    fetchNotices();
  };

  // ─── CRUD operations ────────────────────────────────────────────────────────
  const handleUpdate = async (id: string, updates: Partial<Notice>) => {
    try {
      await fetch(`/api/notices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      fetchNotices();
    } catch {
      showToast("Update failed.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    showToast("Notice deleted.", "success");
    fetchNotices();
  };

  // ─── Drag & Drop reorder ────────────────────────────────────────────────────
  const handleDragStart = (_e: React.DragEvent, id: string) => {
    setDragId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!dragId || dragId === targetId) {
      setDragId(null);
      return;
    }

    const dragIndex = notices.findIndex((n) => n.id === dragId);
    const targetIndex = notices.findIndex((n) => n.id === targetId);
    if (dragIndex === -1 || targetIndex === -1) {
      setDragId(null);
      return;
    }

    // Reorder locally
    const reordered = [...notices];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    // Update display_order for all affected items
    const updatedNotices = reordered.map((n, idx) => ({
      ...n,
      display_order: idx,
    }));
    setNotices(updatedNotices);
    setDragId(null);

    // Persist new order to API
    try {
      await Promise.all(
        updatedNotices.map((n) =>
          fetch(`/api/notices/${n.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ display_order: n.display_order }),
          })
        )
      );
      showToast("Order updated.", "success");
    } catch {
      showToast("Failed to save order.", "error");
      fetchNotices();
    }
  };

  // ─── Filtering ──────────────────────────────────────────────────────────────
  const filtered = notices.filter((n) => {
    return categoryFilter === "All" || n.service_category === categoryFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Megaphone}
        title="Notices"
        description="Manage promotional posters, NFO posters, campaign posters, and service-related notices."
        action={
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload Notices"}
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

      {/* Category Filter */}
      {notices.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-medium text-neutral-600">
            {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
            {categoryFilter !== "All" && ` in ${categoryFilter}`}
          </span>
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
              {NOTICE_CATEGORIES.map((cat) => (
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
          icon={Megaphone}
          title={categoryFilter !== "All" ? "No notices match your filter" : "No notices yet"}
          description={
            categoryFilter !== "All"
              ? "Try adjusting your category filter."
              : "Upload your first notice poster to get started."
          }
          action={
            categoryFilter === "All" ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Notices
              </button>
            ) : undefined
          }
        />
      ) : (
        <ContentCard noPadding>
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              Drag cards to reorder. Changes save automatically.
            </span>
          </div>
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onUpdate={(updates) => handleUpdate(notice.id, updates)}
                  onDelete={() => handleDelete(notice.id)}
                  isDragging={dragId === notice.id}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
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
