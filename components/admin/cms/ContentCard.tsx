import React from "react";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function ContentCard({ children, className = "", noPadding = false }: ContentCardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-2xl shadow-sm ${noPadding ? "" : "p-5 md:p-6"} ${className}`}
    >
      {children}
    </div>
  );
}
