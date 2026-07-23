import Image from "next/image";
import type { SiteConfig } from "@/lib/types";

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-card-border bg-surface/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-4">
          <Image
            src="/logo-msspk.png"
            alt="Logo MSSPk"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <div>
            <p className="font-bold text-accent">{site.event.shortName}</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              {site.footer.credit}
            </p>
            <p className="mt-2 max-w-sm text-xs text-muted/80">
              {site.footer.note}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-foreground">Pautan</p>

          <a
            href={site.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-accent"
          >
            YouTube
          </a>
          <a
            href={site.links.mapsExternal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-accent"
          >
            Google Maps
          </a>
        </div>
      </div>
      <div className="border-t border-card-border py-4 text-center text-xs text-muted">
        © {site.event.year} {site.event.organizer}. Hak cipta terpelihara.
      </div>
    </footer>
  );
}
