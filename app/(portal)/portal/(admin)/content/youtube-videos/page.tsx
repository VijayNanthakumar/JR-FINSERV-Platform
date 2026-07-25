"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Video, Plus, X, Play, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingState } from "@/components/admin/cms/LoadingState";
import { SearchBar } from "@/components/admin/cms/SearchBar";
import { VIDEO_CATEGORIES, type YouTubeVideo } from "@/types/cms";
import { extractYouTubeId, getYouTubeThumbnailUrl } from "@/lib/youtube";

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-300 ${
        type === "success" ? "bg-emerald-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}

const emptyVideo = (): Partial<YouTubeVideo> => ({
  title: "",
  description: "",
  youtube_url: "",
  category: "Homepage",
  display_order: 0,
  is_active: true,
});

interface VideoFormProps {
  data: Partial<YouTubeVideo>;
  onChange: (d: Partial<YouTubeVideo>) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
  saving: boolean;
  isDirty: boolean;
  isNew?: boolean;
  errors?: Record<string, string>;
}

function VideoForm({
  data,
  onChange,
  onSave,
  onCancel,
  onDelete,
  saving,
  isDirty,
  isNew,
  errors,
}: VideoFormProps) {
  const videoId = extractYouTubeId(data.youtube_url);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Video Title *
          </label>
          <input
            type="text"
            value={data.title ?? ""}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="e.g. Sustained Wealth Growth via SIPs"
            className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all ${
              errors?.title ? "border-red-400" : "border-neutral-200"
            }`}
          />
          {errors?.title && <p className="text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* YouTube URL */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            YouTube URL *
          </label>
          <input
            type="url"
            value={data.youtube_url ?? ""}
            onChange={(e) => onChange({ ...data, youtube_url: e.target.value })}
            placeholder="e.g. https://www.youtube.com/watch?v=xxxx or https://youtu.be/xxxx"
            className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all ${
              errors?.youtube_url ? "border-red-400" : "border-neutral-200"
            }`}
          />
          <p className="text-[11px] text-neutral-400">
            Paste standard YouTube URL or share link. Video ID will be extracted automatically.
          </p>
          {errors?.youtube_url && <p className="text-xs text-red-500">{errors.youtube_url}</p>}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Category *
          </label>
          <select
            value={data.category ?? "Homepage"}
            onChange={(e) => onChange({ ...data, category: e.target.value })}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white"
          >
            {VIDEO_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Display Order */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Display Order
          </label>
          <input
            type="number"
            min={0}
            value={data.display_order ?? 0}
            onChange={(e) => onChange({ ...data, display_order: Number(e.target.value) })}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
            Description / Client Notes
          </label>
          <textarea
            rows={2}
            value={data.description ?? ""}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            placeholder="Brief details or client name (optional)…"
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          Active Status
        </label>
        <StatusToggle
          active={data.is_active ?? true}
          onChange={(val) => onChange({ ...data, is_active: val })}
        />
      </div>

      {/* Auto-Generated Thumbnail Preview */}
      {thumbnailUrl && (
        <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider flex items-center justify-between">
            <span>Auto-Generated Preview</span>
            <span className="text-[10px] text-emerald-600 font-mono">ID: {videoId}</span>
          </span>
          <div className="relative aspect-video max-w-sm rounded-lg overflow-hidden border border-neutral-200 bg-black mt-1 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail Preview"
              className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/0.jpg`;
                            }}
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div>
          {!isNew && onDelete && (
            <DeleteDialog
              message="This will permanently delete this YouTube video record."
              onConfirm={onDelete}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || !isDirty}
            className="px-5 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : isNew ? "Add Video" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function YouTubeVideosCmsPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newVideo, setNewVideo] = useState<Partial<YouTubeVideo>>(emptyVideo());
  const [newErrors, setNewErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<YouTubeVideo>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/youtube-videos");
      const json = await res.json();
      if (json.success) setVideos(json.data ?? []);
    } catch {
      showToast("Failed to load YouTube videos.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleCreate = async () => {
    const errors: Record<string, string> = {};
    if (!newVideo.title?.trim()) errors.title = "Video title is required.";
    if (!newVideo.youtube_url?.trim()) {
      errors.youtube_url = "YouTube URL is required.";
    } else {
      const vId = extractYouTubeId(newVideo.youtube_url);
      if (!vId) errors.youtube_url = "Invalid YouTube URL format.";
    }
    if (Object.keys(errors).length > 0) {
      setNewErrors(errors);
      return;
    }

    setSaving("new");
    try {
      const res = await fetch("/api/youtube-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVideo),
      });
      const json = await res.json();
      if (json.success) {
        showToast("YouTube Video added successfully.", "success");
        setShowNewForm(false);
        setNewVideo(emptyVideo());
        setNewErrors({});
        fetchVideos();
      } else {
        showToast(json.message ?? "Failed to add video.", "error");
      }
    } catch {
      showToast("Failed to save video.", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!editId) return;
    setSaving(editId);
    try {
      const res = await fetch(`/api/youtube-videos/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Video updated successfully.", "success");
        setEditId(null);
        fetchVideos();
      } else {
        showToast(json.message ?? "Save failed.", "error");
      }
    } catch {
      showToast("Save failed.", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/youtube-videos/${id}`, { method: "DELETE" });
    showToast("Video deleted.", "success");
    fetchVideos();
  };

  const filtered = videos.filter((v) => {
    const matchesSearch =
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      (v.description?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const matchesCategory =
      selectedCategoryFilter === "All" || v.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Video}
        title="YouTube Videos"
        description="Manage embedded YouTube video content across Homepage and Service pages."
        action={
          <button
            onClick={() => {
              setShowNewForm(true);
              setEditId(null);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add YouTube Video
          </button>
        }
      />

      {/* New Video Form Card */}
      {showNewForm && (
        <ContentCard>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-navy-900">Add New YouTube Video</h2>
            <button
              onClick={() => {
                setShowNewForm(false);
                setNewVideo(emptyVideo());
                setNewErrors({});
              }}
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-neutral-500" />
            </button>
          </div>
          <VideoForm
            data={newVideo}
            onChange={setNewVideo}
            onSave={handleCreate}
            onCancel={() => {
              setShowNewForm(false);
              setNewVideo(emptyVideo());
              setNewErrors({});
            }}
            saving={saving === "new"}
            isDirty={true}
            isNew
            errors={newErrors}
          />
        </ContentCard>
      )}

      {/* Search & Category Filter Controls */}
      {videos.length > 0 && (
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
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="text-xs border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
            >
              <option value="All">All Categories</option>
              {VIDEO_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Video List */}
      {loading ? (
        <LoadingState rows={4} />
      ) : filtered.length === 0 && !showNewForm ? (
        <EmptyState
          icon={Video}
          title={search || selectedCategoryFilter !== "All" ? "No matching videos found" : "No YouTube videos yet"}
          description={
            search || selectedCategoryFilter !== "All"
              ? "Try adjusting your search or category filter."
              : "Add your first YouTube video to feature on the website."
          }
          action={
            !search && selectedCategoryFilter === "All" ? (
              <button
                onClick={() => setShowNewForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add YouTube Video
              </button>
            ) : undefined
          }
        />
      ) : (
        <ContentCard noPadding>
          <div className="divide-y divide-neutral-100">
            {filtered.map((video) => {
              const isEditing = editId === video.id;
              const draft = isEditing ? editDraft : video;
              const videoId = extractYouTubeId(video.youtube_url);
              const thumbUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;

              return (
                <div key={video.id} className="p-5">
                  {isEditing ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-navy-900 text-sm">
                          Editing: {video.title}
                        </h3>
                        <button
                          onClick={() => setEditId(null)}
                          className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                      <VideoForm
                        data={draft}
                        onChange={setEditDraft}
                        onSave={handleSaveEdit}
                        onCancel={() => setEditId(null)}
                        onDelete={() => handleDelete(video.id)}
                        saving={saving === video.id}
                        isDirty={true}
                      />
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Video Thumbnail Preview */}
                      <div className="relative aspect-video h-20 w-36 rounded-xl border border-neutral-200 bg-black overflow-hidden shrink-0 group">
                        {thumbUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={thumbUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/0.jpg`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <Video className="h-6 w-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                            <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm text-navy-900 truncate">
                            {video.title}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                            {video.category}
                          </span>
                        </div>
                        {video.description && (
                          <p className="text-xs text-neutral-500 font-body line-clamp-1 mt-0.5">
                            {video.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5">
                          <a
                            href={video.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-neutral-400 hover:text-blue-600 transition-colors flex items-center gap-1 font-mono"
                          >
                            ID: {videoId}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <span className="text-[11px] text-neutral-300">•</span>
                          <span className="text-[11px] text-neutral-400">
                            Order: {video.display_order}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <StatusToggle
                          active={video.is_active}
                          onChange={async (val) => {
                            await fetch(`/api/youtube-videos/${video.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ is_active: val }),
                            });
                            fetchVideos();
                          }}
                        />
                        <button
                          onClick={() => {
                            setEditId(video.id);
                            setEditDraft({ ...video });
                            setShowNewForm(false);
                          }}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <DeleteDialog
                          message={`Delete "${video.title}" permanently?`}
                          onConfirm={() => handleDelete(video.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ContentCard>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
