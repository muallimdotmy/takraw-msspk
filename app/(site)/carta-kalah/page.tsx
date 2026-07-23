import { Suspense } from "react";
import type { Metadata } from "next";
import cartaBerpasukan from "@/content/carta-kalah.json";
import cartaQuadrant from "@/content/carta-kalah-quadrant.json";
import { CartaKalahClient } from "@/components/bracket/CartaKalahClient";

export const metadata: Metadata = {
  title: "Carta Kalah Singkir",
  description:
    "Carta kalah singkir Kejohanan Sepak Takraw MSS Perak 2026 — Regu Berpasukan & Quadrant.",
};

export default async function CartaKalahPage({
  searchParams,
}: {
  searchParams: Promise<{ acara?: string }>;
}) {
  const sp = await searchParams;
  const initialAcara =
    sp.acara === "quadrant" ? "quadrant" : "berpasukan";

  return (
    <div className="bg-court min-h-full">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">
            Knockout
          </p>
          <h1 className="section-title mt-2 text-3xl font-extrabold sm:text-4xl">
            Carta Kalah Singkir
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Carta pusingan kalah singkir untuk acara{" "}
            <strong className="text-foreground">Regu Berpasukan</strong> dan{" "}
            <strong className="text-foreground">Quadrant</strong>, mengikut
            kategori U12 · U15 · U18.
          </p>
        </header>

        <Suspense
          fallback={
            <p className="text-sm text-muted">Memuatkan carta…</p>
          }
        >
          <CartaKalahClient
            berpasukan={cartaBerpasukan as never}
            quadrant={cartaQuadrant as never}
            initialAcara={initialAcara}
          />
        </Suspense>
      </section>
    </div>
  );
}
