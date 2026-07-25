import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ icon: Icon, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-700 shrink-0">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <h1 className="font-display font-bold text-xl text-navy-900">{title}</h1>
          {description && (
            <p className="text-sm text-neutral-500 font-body">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
