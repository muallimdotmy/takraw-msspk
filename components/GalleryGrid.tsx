import type { SiteConfig } from "@/lib/types";

const gradients = [
  "from-primary-dark via-primary/30 to-surface",
  "from-emerald-900 via-primary/20 to-surface",
  "from-teal-900/80 via-surface to-background",
];

export function GalleryGrid({ site }: { site: SiteConfig }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {site.gallery.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-primary"
          >
            <div
              className={`relative flex min-h-[160px] flex-col justify-end bg-gradient-to-br p-5 ${gradients[i % gradients.length]}`}
              style={
                item.image
                  ? {
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%), url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider ${item.image ? "text-amber-300" : "text-accent"}`}
              >
                Galeri
              </p>
              <h3
                className={`mt-1 text-base font-bold group-hover:text-primary-glow ${item.image ? "text-white" : "text-foreground"}`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-1 text-xs ${item.image ? "text-white/80" : "text-muted"}`}
              >
                {item.description}
              </p>
              <p className="mt-3 text-xs font-semibold text-primary-glow opacity-0 transition group-hover:opacity-100">
                Buka galeri →
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
