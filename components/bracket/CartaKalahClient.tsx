"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { BracketSlot } from "./MatchCard";
import { KnockoutBracket } from "./KnockoutBracket";

type CategoryId = "u12" | "u15" | "u18";
type Acara = "berpasukan" | "quadrant";

type CartaFile = {
  acara: string;
  categories: Record<
    CategoryId,
    { category: string; label: string; slots: BracketSlot[] }
  >;
};

const ACARA_TABS: { id: Acara; label: string; hint: string }[] = [
  { id: "berpasukan", label: "Regu Berpasukan", hint: "25–26 Julai" },
  { id: "quadrant", label: "Quadrant", hint: "24 Julai" },
];

const CAT_TABS: { id: CategoryId; label: string }[] = [
  { id: "u12", label: "Bawah 12 Tahun" },
  { id: "u15", label: "Bawah 15 Tahun" },
  { id: "u18", label: "Bawah 18 Tahun" },
];

export function CartaKalahClient({
  berpasukan,
  quadrant,
  initialAcara,
}: {
  berpasukan: CartaFile;
  quadrant: CartaFile;
  initialAcara: Acara;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const acaraParam = (searchParams.get("acara") as Acara | null) || initialAcara;
  const [acara, setAcara] = useState<Acara>(
    acaraParam === "quadrant" ? "quadrant" : "berpasukan",
  );
  const [cat, setCat] = useState<CategoryId>("u12");

  const data = acara === "quadrant" ? quadrant : berpasukan;
  const block = data.categories[cat];

  const setAcaraAndUrl = useCallback(
    (next: Acara) => {
      setAcara(next);
      const params = new URLSearchParams(searchParams.toString());
      params.set("acara", next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const slots = useMemo(() => block?.slots ?? [], [block]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {ACARA_TABS.map((t) => {
          const active = acara === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setAcaraAndUrl(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
                  : "border border-card-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {t.label}
              <span className="ml-2 text-xs opacity-80">{t.hint}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {CAT_TABS.map((t) => {
          const active = cat === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setCat(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-accent text-[#0a1410]"
                  : "border border-card-border bg-card text-muted hover:border-primary hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-card-border bg-surface/30 p-4 sm:p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary-glow">
              Carta Kalah Singkir
            </p>
            <h2 className="section-title text-xl font-extrabold sm:text-2xl">
              {acara === "quadrant" ? "Quadrant" : "Regu Berpasukan"} ·{" "}
              {block?.label}
            </h2>
          </div>
          <p className="max-w-sm text-right text-xs text-muted">
            Slot diisi selepas keputusan kumpulan. TBA = pasukan belum ditentukan.
          </p>
        </div>

        <KnockoutBracket slots={slots} />
      </div>
    </div>
  );
}
