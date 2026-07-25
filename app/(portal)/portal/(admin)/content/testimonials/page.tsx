"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Quote, Plus, X, User } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { ImageUploader } from "@/components/admin/cms/ImageUploader";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingState } from "@/components/admin/cms/LoadingState";
import { SearchBar } from "@/components/admin/cms/SearchBar";
import { StarRating } from "@/components/admin/cms/StarRating";
import type { Testimonial } from "@/types/cms";

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-300 ${type === "success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {message}
    </div>
  );
}

const emptyTestimonial = (): Partial<Testimonial> => ({
  customer_name: "",
  designation: "",
  company: "",
  review: "",
  rating: 5,
  photo_url: null,
  is_active: true,
  display_order: 0,
});

interface TestimonialFormProps {
  data: Partial<Testimonial>;
  onChange: (d: Partial<Testimonial>) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
  saving: boolean;
  isDirty: boolean;
  isNew?: boolean;
  errors?: Record<string, string>;
}

function TestimonialForm({ data, onChange, onSave, onCancel, onDelete, saving, isDirty, isNew, errors }: TestimonialFormProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Customer Name *</label>
          <input
            type="text"
            value={data.customer_name ?? ""}
            onChange={(e) => onChange({ ...data, customer_name: e.target.value })}
            placeholder="e.g. Rajesh Kumar"
            className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all ${errors?.customer_name ? "border-red-400" : "border-neutral-200"}`}
          />
          {errors?.customer_name && <p className="text-xs text-red-500">{errors.customer_name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Designation</label>
          <input
            type="text"
            value={data.designation ?? ""}
            onChange={(e) => onChange({ ...data, designation: e.target.value })}
            placeholder="e.g. Retired Bank Employee"
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Company / Location</label>
          <input
            type="text"
            value={data.company ?? ""}
            onChange={(e) => onChange({ ...data, company: e.target.value })}
            placeholder="e.g. Salem"
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Display Order</label>
          <input
            type="number"
            min={0}
            value={data.display_order ?? 0}
            onChange={(e) => onChange({ ...data, display_order: Number(e.target.value) })}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Review *</label>
        <textarea
          value={data.review ?? ""}
          onChange={(e) => onChange({ ...data, review: e.target.value })}
          placeholder="Enter the customer's review…"
          rows={4}
          className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none font-body placeholder:text-neutral-400 transition-all ${errors?.review ? "border-red-400" : "border-neutral-200"}`}
        />
        {errors?.review && <p className="text-xs text-red-500">{errors.review}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Rating</label>
        <StarRating
          value={data.rating ?? 5}
          onChange={(rating) => onChange({ ...data, rating })}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Active</label>
        <StatusToggle
          active={data.is_active ?? true}
          onChange={(val) => onChange({ ...data, is_active: val })}
        />
      </div>

      <ImageUploader
        bucket="testimonials"
        currentUrl={data.photo_url}
        onUpload={(url) => onChange({ ...data, photo_url: url })}
        onRemove={() => onChange({ ...data, photo_url: null })}
        label="Customer Photo (optional)"
        hint="Portrait photo recommended, up to 5 MB"
        aspectRatio="square"
      />

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div>
          {!isNew && onDelete && (
            <DeleteDialog
              message="This will permanently delete this testimonial."
              onConfirm={onDelete}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || !isDirty}
            className="px-5 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : isNew ? "Add Testimonial" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCmsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newData, setNewData] = useState<Partial<Testimonial>>(emptyTestimonial());
  const [newErrors, setNewErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Testimonial>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const json = await res.json();
      if (json.success) setTestimonials(json.data ?? []);
    } catch {
      showToast("Failed to load testimonials.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const handleCreate = async () => {
    const errors: Record<string, string> = {};
    if (!newData.customer_name?.trim()) errors.customer_name = "Customer name is required.";
    if (!newData.review?.trim()) errors.review = "Review text is required.";
    if (Object.keys(errors).length > 0) { setNewErrors(errors); return; }

    setSaving("new");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Testimonial added.", "success");
        setShowNewForm(false);
        setNewData(emptyTestimonial());
        setNewErrors({});
        fetchTestimonials();
      } else {
        showToast(json.message ?? "Failed.", "error");
      }
    } catch {
      showToast("Failed.", "error");
    } finally {
      setSaving(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!editId) return;
    setSaving(editId);
    try {
      const res = await fetch(`/api/testimonials/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Testimonial saved.", "success");
        setEditId(null);
        fetchTestimonials();
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
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    showToast("Testimonial deleted.", "success");
    fetchTestimonials();
  };

  const filtered = testimonials.filter(
    (t) =>
      !search ||
      t.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      t.review.toLowerCase().includes(search.toLowerCase()) ||
      (t.company?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Quote}
        title="Testimonials"
        description="Manage customer testimonials displayed on the homepage."
        action={
          <button
            onClick={() => { setShowNewForm(true); setEditId(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        }
      />

      {/* New form */}
      {showNewForm && (
        <ContentCard>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-navy-900">New Testimonial</h2>
            <button onClick={() => { setShowNewForm(false); setNewData(emptyTestimonial()); setNewErrors({}); }} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
              <X className="h-4 w-4 text-neutral-500" />
            </button>
          </div>
          <TestimonialForm
            data={newData}
            onChange={setNewData}
            onSave={handleCreate}
            onCancel={() => { setShowNewForm(false); setNewData(emptyTestimonial()); setNewErrors({}); }}
            saving={saving === "new"}
            isDirty={true}
            isNew
            errors={newErrors}
          />
        </ContentCard>
      )}

      {/* Search */}
      {testimonials.length > 0 && (
        <SearchBar placeholder="Search by name, review…" value={search} onChange={setSearch} className="max-w-xs" />
      )}

      {/* List */}
      {loading ? (
        <LoadingState rows={4} />
      ) : filtered.length === 0 && !showNewForm ? (
        <EmptyState
          icon={Quote}
          title={search ? "No testimonials found" : "No testimonials yet"}
          description={search ? "Try a different search term." : "Add your first customer testimonial."}
          action={!search ? (
            <button onClick={() => setShowNewForm(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add Testimonial
            </button>
          ) : undefined}
        />
      ) : (
        <ContentCard noPadding>
          <div className="divide-y divide-neutral-100">
            {filtered.map((t) => {
              const isEditing = editId === t.id;

              return (
                <div key={t.id} className="p-5">
                  {isEditing ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-navy-900 text-sm">Editing: {t.customer_name}</h3>
                        <button onClick={() => setEditId(null)} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                          <X className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                      <TestimonialForm
                        data={editDraft}
                        onChange={setEditDraft}
                        onSave={handleSaveEdit}
                        onCancel={() => setEditId(null)}
                        onDelete={() => handleDelete(t.id)}
                        saving={saving === t.id}
                        isDirty={true}
                      />
                    </>
                  ) : (
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="h-12 w-12 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden shrink-0">
                        {t.photo_url ? (
                          <Image src={t.photo_url} alt={t.customer_name} width={48} height={48} className="object-cover w-full h-full" />
                        ) : (
                          <User className="h-6 w-6 text-neutral-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-navy-900">{t.customer_name}</span>
                          <StarRating value={t.rating} readonly size="sm" />
                        </div>
                        {(t.designation || t.company) && (
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {[t.designation, t.company].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm text-neutral-600 mt-2 line-clamp-2 font-body">&quot;{t.review}&quot;</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusToggle
                          active={t.is_active}
                          onChange={async (val) => {
                            await fetch(`/api/testimonials/${t.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ is_active: val }),
                            });
                            fetchTestimonials();
                          }}
                        />
                        <button
                          onClick={() => { setEditId(t.id); setEditDraft({ ...t }); setShowNewForm(false); }}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <DeleteDialog
                          message={`Delete testimonial from '${t.customer_name}'?`}
                          onConfirm={() => handleDelete(t.id)}
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
