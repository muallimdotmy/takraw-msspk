import { TeamBadge } from "@/components/TeamBadge";

export type BracketSlot = {
  bil: number;
  round: "qf" | "sf" | "final" | "third";
  label: string;
  tarikh: string;
  masa: string;
  teamA: string;
  teamB: string;
  winner?: string;
};

export function MatchCard({
  slot,
  compact = false,
}: {
  slot: BracketSlot;
  compact?: boolean;
}) {
  const isTba =
    (!slot.teamA || slot.teamA === "TBA") &&
    (!slot.teamB || slot.teamB === "TBA");

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border bg-card shadow-sm transition ${
        isTba
          ? "border-dashed border-card-border opacity-90"
          : "border-card-border"
      } ${compact ? "max-w-[240px]" : "max-w-[280px]"}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-card-border bg-surface/60 px-3 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary-glow">
          {slot.label}
        </span>
        <span className="text-[10px] font-semibold text-muted">
          #{slot.bil}
        </span>
      </div>
      <div className="space-y-2 px-3 py-2.5">
        <TeamBadge name={slot.teamA || "TBA"} size="sm" />
        <div className="text-center text-[10px] font-bold text-accent">vs</div>
        <TeamBadge name={slot.teamB || "TBA"} size="sm" />
      </div>
      <div className="border-t border-card-border px-3 py-1.5 text-[10px] text-muted">
        {slot.tarikh ? <span>{slot.tarikh}</span> : null}
        {slot.tarikh && slot.masa ? <span> · </span> : null}
        {slot.masa ? <span className="font-semibold">{slot.masa}</span> : null}
        {isTba ? (
          <span className="mt-0.5 block text-[10px] text-muted/80">
            Menunggu keputusan kumpulan
          </span>
        ) : null}
      </div>
    </div>
  );
}
