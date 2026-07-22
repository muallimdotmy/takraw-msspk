import type { MatchRow } from "@/content/placeholders";
import { PlaceholderBadge } from "./PlaceholderBadge";
import { TeamBadge } from "./TeamBadge";

export function ScheduleTable({
  rows,
  categoryLabel,
  isPlaceholder = false,
  metaNote,
}: {
  rows: MatchRow[];
  categoryLabel: string;
  isPlaceholder?: boolean;
  metaNote?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border bg-surface/60 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-foreground">
            Jadual — {categoryLabel}
          </p>
          <p className="text-xs text-muted">
            {metaNote ||
              (isPlaceholder ? "Data contoh sahaja." : "Jadual rasmi kejohanan.")}
          </p>
        </div>
        {isPlaceholder ? <PlaceholderBadge /> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-card-border text-xs uppercase tracking-wider text-muted">
              <th className="px-3 py-3 font-semibold">#</th>
              <th className="px-3 py-3 font-semibold">Tarikh</th>
              <th className="px-3 py-3 font-semibold">Masa</th>
              <th className="px-3 py-3 font-semibold">Pusingan</th>
              <th className="px-3 py-3 font-semibold">Regu A</th>
              <th className="px-3 py-3 text-center font-semibold">vs</th>
              <th className="px-3 py-3 font-semibold">Regu B</th>
              <th className="px-3 py-3 font-semibold">Keputusan</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-muted"
                >
                  Tiada perlawanan dalam jadual.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={`${row.bil ?? i}-${row.masa}-${row.reguA}`}
                  className="border-b border-card-border/60 transition hover:bg-primary/5 last:border-0"
                >
                  <td className="px-3 py-3 text-muted">{row.bil ?? i + 1}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {row.tarikh || "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {row.masa}
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary-glow">
                      {row.pusingan}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <TeamBadge
                      name={row.reguA}
                      code={row.codeA}
                      showCode={Boolean(row.codeA)}
                    />
                  </td>
                  <td className="px-3 py-3 text-center text-xs font-bold text-accent">
                    vs
                  </td>
                  <td className="px-3 py-3">
                    <TeamBadge
                      name={row.reguB}
                      code={row.codeB}
                      showCode={Boolean(row.codeB)}
                    />
                  </td>
                  <td className="px-3 py-3 text-muted">
                    {row.keputusan || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
