"use client";

import berpasukanJadual from "@/content/jadual.json";
import { EventScheduleTabs } from "./EventScheduleTabs";
import type { SiteConfig } from "@/lib/types";

/** Jadual Regu Berpasukan (25–26 Julai) */
export function CategoryTabs({ site: _site }: { site: SiteConfig }) {
  return (
    <EventScheduleTabs
      data={berpasukanJadual as unknown as Record<string, unknown>}
      acaraLabel="Regu Berpasukan"
    />
  );
}
