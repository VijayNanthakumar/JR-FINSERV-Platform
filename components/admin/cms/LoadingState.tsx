export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-20 rounded-xl bg-neutral-100 animate-pulse border border-neutral-200"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

export function LoadingGrid({ cols = 3, rows = 2 }: { cols?: number; rows?: number }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4`}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div
          key={i}
          className="aspect-video rounded-xl bg-neutral-100 animate-pulse border border-neutral-200"
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}
