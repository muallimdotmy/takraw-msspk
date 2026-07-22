import { placeholderGalleryItems } from "@/content/placeholders";
import type { SiteConfig } from "@/lib/types";
import { PlaceholderBadge } from "./PlaceholderBadge";

const gradients = [
  "from-primary-dark via-primary/30 to-surface",
  "from-emerald-900 via-primary/20 to-surface",
  "from-teal-900/80 via-surface to-background",
  "from-primary/40 via-card to-surface",
  "from-accent/25 via-primary-dark/50 to-surface",
  "from-primary-dark/80 via-surface to-card",
];

export function GalleryGrid({ site }: { site: SiteConfig }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">
          Grid foto contoh. Ganti dengan imej sebenar di{" "}
          <code className="text-accent">public/galeri/</code> atau pautan Drive.
        </p>
        <PlaceholderBadge />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderGalleryItems.map((item, i) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-card-border bg-card"
          >
            <div
              className={`relative flex aspect-[4/3] flex-col justify-end bg-gradient-to-br p-4 ${gradients[i % gradients.length]}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0, transparent 40%), radial-gradient(circle at 70% 60%, rgba(245,197,24,0.12) 0, transparent 35%)",
                }}
              />
              <div className="absolute right-3 top-3">
                <PlaceholderBadge />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-foreground"
                  aria-hidden
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10" r="1.5" />
                  <path d="M21 16l-5-5-4 4-2-2-5 5" />
                </svg>
              </div>
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {item.day}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {site.gallery.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-card-border bg-surface/50 px-4 py-3 text-sm transition hover:border-primary"
          >
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-0.5 text-xs text-muted">{item.description}</p>
            <p className="mt-2 text-xs font-semibold text-primary-glow">
              Buka galeri lama (Google Sites) →
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
