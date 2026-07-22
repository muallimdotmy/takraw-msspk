"use client";

import { useState } from "react";
import { placeholderJadual } from "@/content/placeholders";
import type { CategoryId, SiteConfig } from "@/lib/types";
import { EmbedFrame } from "./EmbedFrame";
import { ScheduleTable } from "./ScheduleTable";

export function CategoryTabs({ site }: { site: SiteConfig }) {
  const [active, setActive] = useState<CategoryId>("u12");
  const src = site.embeds.jadual[active];
  const cat = site.categories.find((c) => c.id === active)!;

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label="Kategori umur"
        className="flex flex-wrap gap-2"
      >
        {site.categories.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-accent text-[#0a1410] shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
                  : "border border-card-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {src ? (
        <EmbedFrame
          src={src}
          title={`Jadual perlawanan — ${cat.label}`}
          variant="tall"
        />
      ) : (
        <ScheduleTable
          rows={placeholderJadual[active]}
          categoryLabel={cat.label}
        />
      )}
    </div>
  );
}
