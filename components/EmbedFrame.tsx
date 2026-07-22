import type { ReactNode } from "react";
import { PlaceholderBadge } from "./PlaceholderBadge";

type EmbedFrameProps = {
  src: string;
  title: string;
  /** "video" = 16:9, "tall" = sheets/pdf min height */
  variant?: "video" | "tall" | "map";
  fallbackHref?: string;
  fallbackLabel?: string;
  emptyMessage?: string;
  /** Custom content bila src kosong (jadual/keputusan/pdf) */
  placeholder?: ReactNode;
};

export function EmbedFrame({
  src,
  title,
  variant = "video",
  fallbackHref,
  fallbackLabel = "Buka dalam tab baharu",
  emptyMessage = "Pautan embed belum dikonfigurasi. Kemas kini content/site.ts.",
  placeholder,
}: EmbedFrameProps) {
  const heightClass =
    variant === "tall"
      ? "min-h-[420px] h-[min(70vh,640px)]"
      : variant === "map"
        ? "min-h-[320px] h-[min(50vh,420px)]"
        : "aspect-video";

  if (!src) {
    if (placeholder) {
      return <>{placeholder}</>;
    }

    return (
      <div
        className={`flex ${heightClass} w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-card-border bg-surface/80 px-6 text-center`}
      >
        <PlaceholderBadge />
        <p className="max-w-md text-sm text-muted">{emptyMessage}</p>
        {fallbackHref ? (
          <a
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-glow"
          >
            {fallbackLabel}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-card-border bg-card shadow-[0_0_0_1px_rgba(20,158,108,0.08)]">
      <div className={`relative w-full ${heightClass} bg-surface`}>
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {(fallbackHref || src) && (
        <div className="flex items-center justify-between gap-3 border-t border-card-border bg-surface/60 px-4 py-2.5">
          <span className="truncate text-xs text-muted">{title}</span>
          <a
            href={fallbackHref || src}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-semibold text-accent transition hover:text-accent-soft"
          >
            {fallbackLabel} →
          </a>
        </div>
      )}
    </div>
  );
}
