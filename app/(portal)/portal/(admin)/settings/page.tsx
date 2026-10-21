"use client";


import { Settings, Shield, Globe, Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/admin/cms/SectionHeader";
import { ContentCard } from "@/components/admin/cms/ContentCard";
import { company } from "@/config/company";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        icon={Settings}
        title="Settings & Configuration"
        description="General platform configuration and organization metadata."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="font-display font-semibold text-navy-900">Organization Info</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Company Name</dt>
              <dd className="text-navy-900 font-medium mt-0.5">{company.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Legal Tagline</dt>
              <dd className="text-navy-900 font-medium mt-0.5">{company.tagline}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Office Hours</dt>
              <dd className="text-navy-900 font-medium mt-0.5">{company.officeHours.display}</dd>
            </div>
          </dl>
        </ContentCard>

        <ContentCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="font-display font-semibold text-navy-900">Contact Metadata</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Phone</dt>
                <dd className="text-navy-900 font-medium mt-0.5">{company.phone.display}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Email</dt>
                <dd className="text-navy-900 font-medium mt-0.5">{company.email.display}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Head Office</dt>
                <dd className="text-navy-900 font-medium mt-0.5">{company.address.full}</dd>
              </div>
            </div>
          </dl>
        </ContentCard>
      </div>
    </div>
  );
}
