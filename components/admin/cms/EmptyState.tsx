import { ImageIcon, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = ImageIcon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center gap-5">
      <div className="h-16 w-16 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
        <Icon className="h-8 w-8 text-neutral-300" />
      </div>
      <div className="flex flex-col gap-1 max-w-xs">
        <h3 className="font-display font-semibold text-navy-900 text-base">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-500 font-body">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
