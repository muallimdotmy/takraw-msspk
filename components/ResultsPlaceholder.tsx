import {
  placeholderKeputusan,
  placeholderKeputusanKategori,
} from "@/content/placeholders";
import { PlaceholderBadge } from "./PlaceholderBadge";

export function ResultsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border bg-surface/60 px-4 py-3">
          <div>
            <p className="text-sm font-bold text-foreground">
              Pungutan pingat (contoh)
            </p>
            <p className="text-xs text-muted">
              Data demo — ganti dengan Sheets/Docs sebenar
            </p>
          </div>
          <PlaceholderBadge />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-card-border text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Daerah / Kontinjen</th>
                <th className="px-4 py-3 text-center font-semibold text-accent">
                  Emas
                </th>
                <th className="px-4 py-3 text-center font-semibold text-muted">
                  Perak
                </th>
                <th className="px-4 py-3 text-center font-semibold text-orange-400">
                  Gangsa
                </th>
              </tr>
            </thead>
            <tbody>
              {placeholderKeputusan.map((row) => (
                <tr
                  key={row.daerah}
                  className="border-b border-card-border/60 last:border-0 hover:bg-primary/5"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        row.kedudukan === 1
                          ? "bg-accent text-[#0a1410]"
                          : row.kedudukan === 2
                            ? "bg-zinc-400 text-white"
                            : row.kedudukan === 3
                              ? "bg-orange-500/80 text-white"
                              : "bg-surface text-muted"
                      }`}
                    >
                      {row.kedudukan}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.daerah}</td>
                  <td className="px-4 py-3 text-center font-semibold text-accent">
                    {row.emas}
                  </td>
                  <td className="px-4 py-3 text-center text-muted">{row.perak}</td>
                  <td className="px-4 py-3 text-center text-orange-400">
                    {row.gangsa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {placeholderKeputusanKategori.map((k) => (
          <div
            key={k.kategori}
            className="rounded-2xl border border-card-border bg-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-glow">
                {k.kategori}
              </p>
              <PlaceholderBadge />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-2">
                <span className="text-accent">🥇 Emas</span>
                <span className="font-medium text-right">{k.emas}</span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-zinc-300">🥈 Perak</span>
                <span className="font-medium text-right">{k.perak}</span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-orange-400">🥉 Gangsa</span>
                <span className="font-medium text-right">{k.gangsa}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
