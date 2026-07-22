import { CategoryTabs } from "@/components/CategoryTabs";
import { EmbedFrame } from "@/components/EmbedFrame";
import { EventBanner } from "@/components/EventBanner";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { ProgramPlaceholder } from "@/components/ProgramPlaceholder";
import { QuadrantResults } from "@/components/QuadrantResults";
import { QuadrantSchedule } from "@/components/QuadrantSchedule";
import { ResultsPanel } from "@/components/ResultsPanel";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { getSite } from "@/lib/get-site";

export const dynamic = "force-dynamic";

export default function Home() {
  const site = getSite();

  return (
    <>
      <Hero site={site} />
      <EventBanner />
      <Stats site={site} />

      <Section
        id="jadual-quadrant"
        eyebrow="Quadrant · 24 Julai"
        title="Jadual Quadrant"
        description="Acara Quadrant — Jumaat 24 Julai 2026, STAR Wellness Hub UPSI."
      >
        <QuadrantSchedule />
      </Section>

      <Section
        id="keputusan-quadrant"
        eyebrow="Quadrant · Keputusan"
        title="Keputusan Quadrant"
        description="Kedudukan & keputusan perlawanan acara Quadrant."
        className="bg-surface/40"
      >
        <QuadrantResults />
      </Section>

      <Section
        id="jadual"
        eyebrow="Regu Berpasukan · 25–26 Julai"
        title="Jadual Regu Berpasukan"
        description="Jadual rasmi Regu Berpasukan MSS Perak 2026 mengikut kategori umur."
      >
        <CategoryTabs site={site} />
      </Section>

      <Section
        id="keputusan"
        eyebrow="Regu Berpasukan · Keputusan"
        title="Keputusan Regu Berpasukan"
        description="Kedudukan & keputusan perlawanan regu berpasukan mengikut kategori."
        className="bg-surface/40"
      >
        <ResultsPanel />
      </Section>

      <Section
        id="galeri"
        eyebrow="Galeri"
        title="Galeri Gambar"
        description="Grid placeholder + pautan ke galeri Google Sites lama."
      >
        <GalleryGrid site={site} />
      </Section>

      <Section
        id="buku-program"
        eyebrow="Dokumen"
        title="Buku Program"
        description="Cover & senarai kandungan contoh. Sambung Drive PDF bila sedia, atau buka AnyFlip sementara."
        className="bg-surface/40"
      >
        {site.embeds.bukuProgram ? (
          <EmbedFrame
            src={site.embeds.bukuProgram}
            title="Buku program PDF"
            variant="tall"
            fallbackHref={site.links.bukuProgramAnyflip}
            fallbackLabel="Buka buku program (AnyFlip)"
          />
        ) : (
          <ProgramPlaceholder site={site} />
        )}
      </Section>

      <Section
        id="lokasi"
        eyebrow="Venue"
        title="Lokasi"
        description={site.event.venueFull}
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <EmbedFrame
            src={site.embeds.maps}
            title="Peta venue"
            variant="map"
            fallbackHref={site.links.mapsExternal}
            fallbackLabel="Buka Google Maps"
          />
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-card-border bg-card p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-glow">
                Alamat
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {site.event.venueFull}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={site.links.mapsExternal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-glow"
              >
                Google Maps
              </a>
              <a
                href={site.links.waze}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-card-border px-5 py-2.5 text-sm font-bold text-foreground transition hover:border-primary"
              >
                Waze
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="media"
        eyebrow="Media"
        title="YouTube · Majlis Penutup"
        description="Tonton highlight dan majlis penutup kejohanan."
        className="bg-surface/40"
      >
        <EmbedFrame
          src={site.embeds.youtube.majlisPenutup}
          title="Majlis penutup / highlight YouTube"
          variant="video"
          fallbackHref={site.links.youtube}
          fallbackLabel="Buka di YouTube"
        />
      </Section>
    </>
  );
}
