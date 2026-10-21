"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Images, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { ImageUploader } from "@/components/admin/cms/ImageUploader";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingState } from "@/components/admin/cms/LoadingState";
import type { HeroSlide } from "@/types/cms";

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white transition-all animate-in fade-in slide-in-from-bottom-4 duration-300 ${
        type === "success" ? "bg-emerald-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}

// ─── Default form state ───────────────────────────────────────────────────────

const emptySlide = (): Partial<HeroSlide> => ({
  title: "",
  subtitle: "",
  primary_cta_text: "",
  primary_cta_link: "",
  secondary_cta_text: "",
  secondary_cta_link: "",
  image_url: null,
  background_image_url: null,
  is_active: true,
  display_order: 0,
});

// ─── Hero Slide Form ──────────────────────────────────────────────────────────

interface SlideFormProps {
  slide: Partial<HeroSlide>;
  onChange: (updated: Partial<HeroSlide>) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
  isSaving: boolean;
  isDirty: boolean;
  isNew?: boolean;
}

function SlideForm({ slide, onChange, onSave, onCancel, onDelete, isSaving, isDirty, isNew }: SlideFormProps) {
  const field = (key: keyof HeroSlide, label: string, placeholder?: string, textarea?: boolean) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">{label}</label>
      {textarea ? (
        <textarea
          value={(slide[key] as string) ?? ""}
          onChange={(e) => onChange({ ...slide, [key]: e.target.value })}
          placeholder={placeholder}
          rows={3}
          className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none font-body placeholder:text-neutral-400 transition-all"
        />
      ) : (
        <input
          type="text"
          value={(slide[key] as string) ?? ""}
          onChange={(e) => onChange({ ...slide, [key]: e.target.value })}
          placeholder={placeholder}
          className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 font-body placeholder:text-neutral-400 transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Title + Status */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          {field("title", "Hero Title *", "e.g. Secure Today. Grow Tomorrow.")}
        </div>
        <div className="flex flex-col gap-1.5 shrink-0 mt-1 sm:mt-6">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Active</label>
          <StatusToggle
            active={slide.is_active ?? true}
            onChange={(val) => onChange({ ...slide, is_active: val })}
          />
        </div>
      </div>

      {field("subtitle", "Subtitle / Body Text", "Supporting description for this slide", true)}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("primary_cta_text", "Primary CTA Text", "e.g. Explore Our Services")}
        {field("primary_cta_link", "Primary CTA Link", "e.g. /services")}
        {field("secondary_cta_text", "Secondary CTA Text", "e.g. Speak to an Advisor")}
        {field("secondary_cta_link", "Secondary CTA Link", "e.g. /contact")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageUploader
          bucket="hero"
          currentUrl={slide.image_url}
          onUpload={(url) => onChange({ ...slide, image_url: url })}
          onRemove={() => onChange({ ...slide, image_url: null })}
          label="Hero Image"
          aspectRatio="landscape"
        />
        <ImageUploader
          bucket="hero"
          currentUrl={slide.background_image_url}
          onUpload={(url) => onChange({ ...slide, background_image_url: url })}
          onRemove={() => onChange({ ...slide, background_image_url: null })}
          label="Background Image (optional)"
          aspectRatio="landscape"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Display Order</label>
        <input
          type="number"
          min={0}
          value={slide.display_order ?? 0}
          onChange={(e) => onChange({ ...slide, display_order: Number(e.target.value) })}
          className="w-28 text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div>
          {!isNew && onDelete && (
            <DeleteDialog
              message="This will permanently delete this hero slide."
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
            disabled={isSaving || !isDirty}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving…" : isNew ? "Create Slide" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HeroCmsPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<HeroSlide>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>(emptySlide());
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hero", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setSlides(json.data ?? []);
    } catch {
      showToast("Failed to load hero slides.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  const handleSaveExisting = async (id: string) => {
    setSaving(id);
    try {
      const res = await fetch(`/api/hero/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drafts[id]),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Slide saved.", "success");
        setDrafts((d) => { const n = { ...d }; delete n[id]; return n; });
        fetchSlides();
      } else {
        showToast(json.message ?? "Save failed.", "error");
      }
    } catch {
      showToast("Save failed.", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleCreate = async () => {
    if (!newSlide.title?.trim()) {
      showToast("Title is required.", "error");
      return;
    }
    setSaving("new");
    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlide),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Hero slide created.", "success");
        setShowNewForm(false);
        setNewSlide(emptySlide());
        fetchSlides();
      } else {
        showToast(json.message ?? "Create failed.", "error");
      }
    } catch {
      showToast("Create failed.", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/hero/${id}`, { method: "DELETE" });
    showToast("Slide deleted.", "success");
    fetchSlides();
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Images}
        title="Hero Slides"
        description="Manage the homepage hero carousel. Changes go live immediately."
        action={
          <button
            onClick={() => { setShowNewForm(true); setExpandedId(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Slide
          </button>
        }
      />

      {/* New slide form */}
      {showNewForm && (
        <ContentCard>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-navy-900">New Hero Slide</h2>
            <button onClick={() => setShowNewForm(false)} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
              <X className="h-4 w-4 text-neutral-500" />
            </button>
          </div>
          <SlideForm
            slide={newSlide}
            onChange={setNewSlide}
            onSave={handleCreate}
            onCancel={() => { setShowNewForm(false); setNewSlide(emptySlide()); }}
            isSaving={saving === "new"}
            isDirty={true}
            isNew
          />
        </ContentCard>
      )}

      {/* Existing slides */}
      {loading ? (
        <LoadingState rows={3} />
      ) : slides.length === 0 && !showNewForm ? (
        <EmptyState
          icon={Images}
          title="No hero slides yet"
          description="Add your first hero slide to populate the homepage carousel."
          action={
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add First Slide
            </button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {slides.map((slide) => {
            const draft = drafts[slide.id] ?? slide;
            const isDirty = !!drafts[slide.id];
            const isExpanded = expandedId === slide.id;

            return (
              <ContentCard key={slide.id} noPadding>
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : slide.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-neutral-50/70 rounded-2xl transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-xs font-bold font-mono">
                    {slide.display_order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-navy-900 truncate">{slide.title}</span>
                      {isDirty && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Unsaved</span>}
                    </div>
                    {slide.subtitle && (
                      <span className="text-xs text-neutral-500 truncate block mt-0.5">{slide.subtitle}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`h-2 w-2 rounded-full ${slide.is_active ? "bg-emerald-500" : "bg-neutral-300"}`} />
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                  </div>
                </button>

                {/* Expanded form */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-neutral-100 pt-5">
                    <SlideForm
                      slide={draft}
                      onChange={(updated) => setDrafts((d) => ({ ...d, [slide.id]: updated }))}
                      onSave={() => handleSaveExisting(slide.id)}
                      onCancel={() => {
                        setDrafts((d) => { const n = { ...d }; delete n[slide.id]; return n; });
                        setExpandedId(null);
                      }}
                      onDelete={() => handleDelete(slide.id)}
                      isSaving={saving === slide.id}
                      isDirty={isDirty}
                    />
                  </div>
                )}
              </ContentCard>
            );
          })}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
