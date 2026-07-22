"use client";

import { useState } from "react";
import type { CategoryId } from "@/lib/types";
import { TeamBadge } from "./TeamBadge";

const CATS: { id: CategoryId; label: string }[] = [
  { id: "u12", label: "Bawah 12 Tahun" },
  { id: "u15", label: "Bawah 15 Tahun" },
  { id: "u18", label: "Bawah 18 Tahun" },
];

type CatBlock = {
  label: string;
  ranking: { kedudukan: string; daerah: string; mata: string }[];
  matches: {
    bil: number | null;
    kumpulan: string;
    reguA: string;
    reguB: string;
    pemenang: string;
    skor: string;
  }[];
};

type Props = {
  data: Record<string, unknown>;
  acaraLabel: string;
};

export function EventResultsPanel({ data, acaraLabel }: Props) {
  const [active, setActive] = useState<CategoryId>("u12");
  const block = (data as unknown as Record<string, CatBlock>)[active];

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Keputusan & kedudukan rasmi {acaraLabel} mengikut kategori.
      </p>

      <div
        role="tablist"
        className="flex flex-wrap gap-2"
        aria-label={`Kategori keputusan ${acaraLabel}`}
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
                  ? "bg-accent text-[#0a1410]"
                  : "border border-card-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {block ? (
        <>
          <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
            <div className="border-b border-card-border bg-surface/60 px-4 py-3">
              <p className="text-sm font-bold">
                Kedudukan — {acaraLabel} · {block.label}
              </p>
              <p className="text-xs text-muted">
                Daerah diisi selepas kejohanan selesai (TBA = belum diisi).
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-card-border text-xs uppercase tracking-wider text-muted">
                    <th className="px-4 py-3 font-semibold">Kedudukan</th>
                    <th className="px-4 py-3 font-semibold">Daerah</th>
                    <th className="px-4 py-3 text-center font-semibold text-accent">
                      Mata
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {block.ranking.map((row, i) => (
                    <tr
                      key={`${row.kedudukan}-${i}`}
                      className="border-b border-card-border/60 last:border-0 hover:bg-primary/5"
                    >
                      <td className="px-4 py-3 font-medium">{row.kedudukan}</td>
                      <td className="px-4 py-3 text-muted">
                        {row.daerah === "TBA" || !row.daerah ? (
                          <span className="text-muted/70">TBA</span>
                        ) : (
                          <TeamBadge name={row.daerah} />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-accent">
                        {row.mata || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
            <div className="border-b border-card-border bg-surface/60 px-4 py-3">
              <p className="text-sm font-bold">
                Keputusan perlawanan — {acaraLabel} · {block.label}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-card-border text-xs uppercase tracking-wider text-muted">
                    <th className="px-3 py-3 font-semibold">#</th>
                    <th className="px-3 py-3 font-semibold">Kump</th>
                    <th className="px-3 py-3 font-semibold">Regu A</th>
                    <th className="px-3 py-3 text-center font-semibold">vs</th>
                    <th className="px-3 py-3 font-semibold">Regu B</th>
                    <th className="px-3 py-3 font-semibold">Pemenang</th>
                  </tr>
                </thead>
                <tbody>
                  {block.matches.map((m, i) => (
                    <tr
                      key={`${m.bil}-${i}`}
                      className="border-b border-card-border/60 last:border-0 hover:bg-primary/5"
                    >
                      <td className="px-3 py-3 text-muted">{m.bil ?? i + 1}</td>
                      <td className="px-3 py-3">
                        <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary-glow">
                          {m.kumpulan || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <TeamBadge name={m.reguA} />
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-accent">
                        vs
                      </td>
                      <td className="px-3 py-3">
                        <TeamBadge name={m.reguB} />
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {m.pemenang ? (
                          <TeamBadge name={m.pemenang} />
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted">Tiada data keputusan.</p>
      )}
    </div>
  );
}
