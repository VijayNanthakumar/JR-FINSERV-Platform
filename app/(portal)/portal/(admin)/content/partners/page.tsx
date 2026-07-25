"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Handshake, Plus, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { ImageUploader } from "@/components/admin/cms/ImageUploader";
import { StatusToggle } from "@/components/admin/cms/StatusToggle";
import { DeleteDialog } from "@/components/admin/cms/DeleteDialog";
import { EmptyState } from "@/components/admin/cms/EmptyState";
import { LoadingState } from "@/components/admin/cms/LoadingState";
import { SearchBar } from "@/components/admin/cms/SearchBar";
import type { Partner } from "@/types/cms";

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-300 ${type === "success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {message}
    </div>
  );
}

const CATEGORY_SUGGESTIONS = [
  "Life Insurance",
  "Health Insurance",
  "General Insurance",
  "Mutual Funds",
  "Pension & Retirement",
  "Other",
];

const emptyPartner = (): Partial<Partner> => ({
  name: "",
  logo_url: "",
  website_url: "",
  category: "",
  is_active: true,
  display_order: 0,
});

interface PartnerFormProps {
  data: Partial<Partner>;
  onChange: (d: Partial<Partner>) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
  saving: boolean;
  isDirty: boolean;
  isNew?: boolean;
  errors?: Record<string, string>;
}

function PartnerForm({ data, onChange, onSave, onCancel, onDelete, saving, isDirty, isNew, errors }: PartnerFormProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Partner Name *</label>
          <input
            type="text"
            value={data.name ?? ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="e.g. SBI Mutual Fund"
            className={`text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all ${errors?.name ? "border-red-400" : "border-neutral-200"}`}
          />
          {errors?.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Category</label>
          <input
            type="text"
            list="partner-categories"
            value={data.category ?? ""}
            onChange={(e) => onChange({ ...data, category: e.target.value })}
            placeholder="e.g. Mutual Funds"
            className="text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
          <datalist id="partner-categories">
            {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Website URL</label>
          <input
            type="url"
            value={data.website_url ?? ""}
            onChange={(e) => onChange({ ...data, website_url: e.target.value })}
            placeholder="https://example.com"
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

      <div className="flex items-center gap-3">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Active</label>
        <StatusToggle
          active={data.is_active ?? true}
          onChange={(val) => onChange({ ...data, is_active: val })}
        />
      </div>

      <ImageUploader
        bucket="partners"
        currentUrl={data.logo_url || null}
        onUpload={(url) => onChange({ ...data, logo_url: url })}
        onRemove={() => onChange({ ...data, logo_url: "" })}
        label="Partner Logo *"
        hint="Recommended: transparent PNG or SVG, up to 5 MB"
        aspectRatio="landscape"
      />
      {errors?.logo_url && <p className="text-xs text-red-500">{errors.logo_url}</p>}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div>
          {!isNew && onDelete && (
            <DeleteDialog
              message="This will permanently delete this partner."
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
            {saving ? "Saving…" : isNew ? "Add Partner" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PartnersCmsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newPartner, setNewPartner] = useState<Partial<Partner>>(emptyPartner());
  const [newErrors, setNewErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Partner>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners");
      const json = await res.json();
      if (json.success) setPartners(json.data ?? []);
    } catch {
      showToast("Failed to load partners.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPartners(); }, [fetchPartners]);

  const handleCreate = async () => {
    const errors: Record<string, string> = {};
    if (!newPartner.name?.trim()) errors.name = "Partner name is required.";
    if (!newPartner.logo_url?.trim()) errors.logo_url = "Logo is required.";
    if (Object.keys(errors).length > 0) { setNewErrors(errors); return; }

    setSaving("new");
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPartner),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Partner added.", "success");
        setShowNewForm(false);
        setNewPartner(emptyPartner());
        setNewErrors({});
        fetchPartners();
      } else {
        showToast(json.message ?? "Failed to add partner.", "error");
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
      const res = await fetch(`/api/partners/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Partner saved.", "success");
        setEditId(null);
        fetchPartners();
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
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    showToast("Partner deleted.", "success");
    fetchPartners();
  };

  const filtered = partners.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Handshake}
        title="Partners"
        description="Manage empanelled partner logos. Grouped by category on the homepage."
        action={
          <button
            onClick={() => { setShowNewForm(true); setEditId(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white rounded-xl transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Partner
          </button>
        }
      />

      {/* New form */}
      {showNewForm && (
        <ContentCard>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-navy-900">Add New Partner</h2>
            <button onClick={() => { setShowNewForm(false); setNewPartner(emptyPartner()); setNewErrors({}); }} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
              <X className="h-4 w-4 text-neutral-500" />
            </button>
          </div>
          <PartnerForm
            data={newPartner}
            onChange={setNewPartner}
            onSave={handleCreate}
            onCancel={() => { setShowNewForm(false); setNewPartner(emptyPartner()); setNewErrors({}); }}
            saving={saving === "new"}
            isDirty={true}
            isNew
            errors={newErrors}
          />
        </ContentCard>
      )}

      {/* Search */}
      {partners.length > 0 && (
        <SearchBar placeholder="Search partners…" value={search} onChange={setSearch} className="max-w-xs" />
      )}

      {/* List */}
      {loading ? (
        <LoadingState rows={5} />
      ) : filtered.length === 0 && !showNewForm ? (
        <EmptyState
          icon={Handshake}
          title={search ? "No partners found" : "No partners yet"}
          description={search ? "Try a different search term." : "Add your first partner logo."}
          action={!search ? (
            <button onClick={() => setShowNewForm(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add Partner
            </button>
          ) : undefined}
        />
      ) : (
        <ContentCard noPadding>
          <div className="divide-y divide-neutral-100">
            {filtered.map((partner) => {
              const isEditing = editId === partner.id;
              const draft = isEditing ? editDraft : partner;

              return (
                <div key={partner.id} className="p-5">
                  {isEditing ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-navy-900 text-sm">Editing: {partner.name}</h3>
                        <button onClick={() => setEditId(null)} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                          <X className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                      <PartnerForm
                        data={draft}
                        onChange={setEditDraft}
                        onSave={handleSaveEdit}
                        onCancel={() => setEditId(null)}
                        onDelete={() => handleDelete(partner.id)}
                        saving={saving === partner.id}
                        isDirty={true}
                      />
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      {/* Logo preview */}
                      <div className="h-14 w-24 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden shrink-0">
                        {partner.logo_url ? (
                          <Image
                            src={partner.logo_url}
                            alt={partner.name}
                            width={80}
                            height={44}
                            className="object-contain max-h-10 w-auto max-w-full"
                          />
                        ) : (
                          <Handshake className="h-6 w-6 text-neutral-300" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-navy-900">{partner.name}</span>
                          {partner.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                              {partner.category}
                            </span>
                          )}
                        </div>
                        {partner.website_url && (
                          <a
                            href={partner.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-400 hover:text-blue-600 transition-colors flex items-center gap-1 mt-0.5 w-fit"
                          >
                            {partner.website_url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusToggle
                          active={partner.is_active}
                          onChange={async (val) => {
                            await fetch(`/api/partners/${partner.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ is_active: val }),
                            });
                            fetchPartners();
                          }}
                        />
                        <button
                          onClick={() => { setEditId(partner.id); setEditDraft({ ...partner }); setShowNewForm(false); }}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <DeleteDialog
                          message={`Delete "${partner.name}" permanently?`}
                          onConfirm={() => handleDelete(partner.id)}
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
