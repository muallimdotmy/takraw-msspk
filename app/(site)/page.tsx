import { CategoryTabs } from "@/components/CategoryTabs";
import { EmbedFrame } from "@/components/EmbedFrame";
import { EventBanner } from "@/components/EventBanner";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { ProgramPlaceholder } from "@/components/ProgramPlaceholder";
import { ResultsPlaceholder } from "@/components/ResultsPlaceholder";
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
        id="jadual"
        eyebrow="Jadual"
        title="Jadual Perlawanan"
        description="Pilih kategori umur. Kini papar data placeholder — sambung Google Sheets di panel Admin bila sedia."
      >
        <CategoryTabs site={site} />
      </Section>

      <Section
        id="keputusan"
        eyebrow="Keputusan"
        title="Keputusan Kejohanan"
        description="Jadual pungutan pingat & juara kategori (data contoh). Akan diganti embed Sheets/Docs sebenar."
        className="bg-surface/40"
      >
        {site.embeds.keputusan ? (
          <EmbedFrame
            src={site.embeds.keputusan}
            title="Keputusan kejohanan"
            variant="tall"
          />
        ) : (
          <ResultsPlaceholder />
        )}
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

      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-primary-dark/40 to-card p-6 sm:p-8">
            <h2 className="section-title text-xl font-extrabold text-foreground sm:text-2xl">
              Kemas kini kandungan
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Semua URL dan teks event boleh diubah di panel{" "}
              <a
                href="/admin"
                className="font-semibold text-accent hover:underline"
              >
                Admin
              </a>{" "}
              (
              <code className="code-inline">/admin</code>
              ). Disimpan ke{" "}
              <code className="code-inline">content/site-config.json</code>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
