import type { MatchRow } from "@/content/placeholders";
import { PlaceholderBadge } from "./PlaceholderBadge";

export function ScheduleTable({
  rows,
  categoryLabel,
}: {
  rows: MatchRow[];
  categoryLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border bg-surface/60 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-foreground">
            Jadual — {categoryLabel}
          </p>
          <p className="text-xs text-muted">
            Data contoh sahaja. Akan diganti dengan Google Sheets.
          </p>
        </div>
        <PlaceholderBadge />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-card-border text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-semibold">Masa</th>
              <th className="px-4 py-3 font-semibold">Court</th>
              <th className="px-4 py-3 font-semibold">Pusingan</th>
              <th className="px-4 py-3 font-semibold">Regu A</th>
              <th className="px-4 py-3 font-semibold text-center">vs</th>
              <th className="px-4 py-3 font-semibold">Regu B</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.masa}-${row.court}-${i}`}
                className="border-b border-card-border/60 transition hover:bg-primary/5 last:border-0"
              >
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {row.masa}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary-glow">
                    {row.court}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{row.pusingan}</td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {row.reguA}
                </td>
                <td className="px-4 py-3 text-center text-xs font-bold text-accent">
                  vs
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {row.reguB}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
