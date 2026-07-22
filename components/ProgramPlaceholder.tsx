import type { SiteConfig } from "@/lib/types";
import { PlaceholderBadge } from "./PlaceholderBadge";

export function ProgramPlaceholder({ site }: { site: SiteConfig }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border bg-surface/60 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-foreground">
            Buku Program {site.event.year}
          </p>
          <p className="text-xs text-muted">
            Preview PDF placeholder — sambung Google Drive kemudian
          </p>
        </div>
        <PlaceholderBadge />
      </div>

      <div className="grid gap-0 md:grid-cols-[200px_1fr]">
        <div className="relative flex min-h-[280px] flex-col items-center justify-center bg-gradient-to-br from-primary-dark via-surface to-background p-6 text-center">
          <div className="absolute inset-3 rounded-lg border border-accent/30" />
          <p className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
            MSSPk
          </p>
          <p className="relative mt-3 text-lg font-extrabold leading-tight text-foreground">
            Buku
            <br />
            Program
          </p>
          <p className="relative mt-2 text-xs text-muted">
            Sepak Takraw
            <br />
            {site.event.year}
          </p>
          <p className="relative mt-6 text-[10px] uppercase tracking-widest text-primary-glow">
            {site.event.dates.replace(` ${site.event.year}`, "")}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {site.event.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kandungan buku program (placeholder): ucapan, urusetia, jadual
              ringkas, peraturan, peta venue, dan senarai kontinjen.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
            {[
              "Ucapan pengerusi",
              "Senarai urusetia",
              "Jadual 3 hari",
              "Peraturan permainan",
              "Peta & venue",
              "Senarai regu",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-lg border border-card-border/80 bg-surface/50 px-3 py-2"
              >
                <span className="text-primary-glow">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={site.links.bukuProgramAnyflip}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-glow"
            >
              Buka AnyFlip (sementara)
            </a>
            <span className="inline-flex items-center rounded-full border border-dashed border-card-border px-4 py-2 text-xs text-muted">
              Drive PDF: belum disambung
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
