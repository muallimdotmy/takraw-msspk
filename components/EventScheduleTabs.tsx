"use client";

import { useMemo, useState } from "react";
import type { MatchRow } from "@/content/placeholders";
import type { CategoryId } from "@/lib/types";
import { ScheduleTable } from "./ScheduleTable";
import { TeamBadge } from "./TeamBadge";

const CATS: { id: CategoryId; label: string }[] = [
  { id: "u12", label: "Bawah 12 Tahun" },
  { id: "u15", label: "Bawah 15 Tahun" },
  { id: "u18", label: "Bawah 18 Tahun" },
];

type JadualCat = {
  category: string;
  meta: {
    tarikh?: string;
    hari?: string;
    masaNote?: string;
    tempat?: string;
  };
  groups: Record<string, { code: string; team: string }[]>;
  matches: Array<{
    bil: number;
    tarikh: string;
    masa: string;
    codeA: string;
    reguA: string;
    codeB: string;
    reguB: string;
    pusingan: string;
    kumpulan: string;
    geladak: string;
    keputusan: string;
  }>;
};

type Props = {
  data: Record<string, unknown>;
  acaraLabel: string;
};

export function EventScheduleTabs({ data, acaraLabel }: Props) {
  const [active, setActive] = useState<CategoryId>("u12");
  const cat = CATS.find((c) => c.id === active)!;
  const block = (data as Record<string, JadualCat | undefined>)[active];

  const rows: MatchRow[] = useMemo(() => {
    if (!block?.matches?.length) return [];
    return block.matches.map((m) => ({
      bil: m.bil,
      tarikh: m.tarikh,
      masa: m.masa,
      court: m.kumpulan ? `Kump. ${m.kumpulan}` : m.pusingan,
      reguA: m.reguA,
      reguB: m.reguB,
      pusingan: m.pusingan,
      codeA: m.codeA,
      codeB: m.codeB,
      kumpulan: m.kumpulan,
      geladak: m.geladak,
      keputusan: m.keputusan,
    }));
  }, [block]);

  const groups = block?.groups;
  const metaNote = block?.meta
    ? [block.meta.tarikh, block.meta.hari, block.meta.tempat]
        .filter(Boolean)
        .join(" · ")
    : undefined;

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Jadual rasmi {acaraLabel} mengikut kategori umur.
      </p>

      <div
        role="tablist"
        aria-label={`Kategori ${acaraLabel}`}
        className="flex flex-wrap gap-2"
      >
        {CATS.map((c) => {
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

      {groups && Object.keys(groups).length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(["A", "B", "C", "D"] as const).map((g) => (
            <div
              key={g}
              className="rounded-xl border border-card-border bg-card p-3"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-primary-glow">
                Kumpulan {g}
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                {(groups[g] || []).map((t) => (
                  <li key={t.code}>
                    <TeamBadge name={t.team} code={t.code} showCode size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      <ScheduleTable
        rows={rows}
        categoryLabel={`${acaraLabel} · ${cat.label}`}
        isPlaceholder={rows.length === 0}
        metaNote={metaNote}
      />
    </div>
  );
}
