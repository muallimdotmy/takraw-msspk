import type { ReactNode } from "react";
import { MatchCard, type BracketSlot } from "./MatchCard";

export function KnockoutBracket({ slots }: { slots: BracketSlot[] }) {
  const byBil = Object.fromEntries(slots.map((s) => [s.bil, s]));
  const qf = [13, 14, 15, 16].map((b) => byBil[b]).filter(Boolean);
  const sf = [17, 18].map((b) => byBil[b]).filter(Boolean);
  const third = byBil[19];
  const final = byBil[20];

  return (
    <div className="space-y-6">
      {/* Mobile: stacked by round */}
      <div className="space-y-6 lg:hidden">
        <RoundBlock title="Suku Akhir" items={qf} />
        <RoundBlock title="Separuh Akhir" items={sf} />
        <div className="grid gap-4 sm:grid-cols-2">
          {final ? (
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
                Akhir
              </h3>
              <MatchCard slot={final} />
            </div>
          ) : null}
          {third ? (
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
                Tempat ke-3 &amp; 4
              </h3>
              <MatchCard slot={third} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Desktop: columns */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-6 items-center">
          <Column title="Suku Akhir">
            <div className="flex flex-col gap-8">
              <Pair>
                {byBil[13] ? <MatchCard slot={byBil[13]} compact /> : null}
                {byBil[14] ? <MatchCard slot={byBil[14]} compact /> : null}
              </Pair>
              <Pair>
                {byBil[15] ? <MatchCard slot={byBil[15]} compact /> : null}
                {byBil[16] ? <MatchCard slot={byBil[16]} compact /> : null}
              </Pair>
            </div>
          </Column>

          <Column title="Separuh Akhir">
            <div className="flex flex-col justify-around gap-16 min-h-[420px]">
              {byBil[17] ? <MatchCard slot={byBil[17]} compact /> : null}
              {byBil[18] ? <MatchCard slot={byBil[18]} compact /> : null}
            </div>
          </Column>

          <Column title="Akhir">
            <div className="flex min-h-[420px] items-center">
              {final ? <MatchCard slot={final} /> : null}
            </div>
          </Column>

          <Column title="Tempat ke-3 & 4">
            <div className="flex min-h-[420px] items-center">
              {third ? <MatchCard slot={third} compact /> : null}
            </div>
          </Column>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Pemenang Suku → Separuh · Pemenang Separuh → Akhir · Kalah Separuh →
          Tempat ke-3 &amp; 4
        </p>
      </div>
    </div>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-primary-glow">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Pair({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function RoundBlock({
  title,
  items,
}: {
  title: string;
  items: BracketSlot[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-glow">
        {title}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((s) => (
          <MatchCard key={s.bil} slot={s} />
        ))}
      </div>
    </div>
  );
}
