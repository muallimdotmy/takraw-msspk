export type CategoryId = "u12" | "u15" | "u18";

export type SiteConfig = {
  event: {
    name: string;
    shortName: string;
    year: number;
    dates: string;
    startDate: string;
    endDate: string;
    venue: string;
    venueFull: string;
    status: string;
    statusLabel: string;
    organizer: string;
  };
  nav: { href: string; label: string }[];
  embeds: {
    youtube: { majlisPenutup: string };
    jadual: Record<CategoryId, string>;
    /** Embed penuh jadual Google Sheet (semua kategori) */
    jadualSheet?: string;
    keputusan: string;
    bukuProgram: string;
    maps: string;
  };
  links: {
    youtube: string;
    mapsExternal: string;
    waze: string;
    legacySite: string;
    bukuProgramAnyflip: string;
    jadualSheet?: string;
  };
  stats: { label: string; value: string; hint: string }[];
  categories: { id: CategoryId; label: string; short: string }[];
  gallery: {
    id: string;
    title: string;
    description: string;
    href: string;
  }[];
  footer: {
    credit: string;
    note: string;
  };
};
