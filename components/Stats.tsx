import type { SiteConfig } from "@/lib/types";

export function Stats({ site }: { site: SiteConfig }) {
  return (
    <section className="pb-6 sm:pb-10" aria-label="Ringkasan kejohanan">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
        {site.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-card-border bg-card p-4 transition hover:border-primary/50 sm:p-5"
          >
            <p className="text-2xl font-extrabold text-accent sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {stat.label}
            </p>
            <p className="mt-0.5 text-xs text-muted">{stat.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
