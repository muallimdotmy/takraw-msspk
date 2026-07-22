export function PlaceholderBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent ${className}`}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      Placeholder
    </span>
  );
}
