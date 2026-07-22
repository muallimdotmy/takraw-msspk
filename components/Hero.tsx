import Image from "next/image";
import type { SiteConfig } from "@/lib/types";

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <section
      id="utama"
      className="relative isolate min-h-[min(92vh,820px)] overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36"
    >
      {/* Background image — sepak takraw court action */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/hero-takraw.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
          aria-hidden
        />
        {/* Overlays ikut CSS var — light & dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--overlay-strong) 0%, var(--overlay-mid) 45%, var(--overlay-soft) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--overlay-strong) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%)]" />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-accent/10 blur-[70px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up space-y-6">
          <div className="hero-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            {site.event.statusLabel}
          </div>

          <h1 className="section-title text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
            <span className="block text-lg font-semibold tracking-widest text-muted sm:text-xl">
              KEJOHANAN
            </span>
            <span className="text-gradient">Sepak Takraw</span>
            <span className="mt-1 block">MSS Perak {site.event.year}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.event.name}. Jadual, keputusan, galeri dan media kejohanan di{" "}
            <span className="text-foreground">{site.event.venue}</span>.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="hero-chip rounded-xl px-3 py-2 font-medium">
              📅 {site.event.dates}
            </span>
            <span className="hero-chip rounded-xl px-3 py-2 font-medium">
              📍 {site.event.venue}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#jadual"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_35%,transparent)] transition hover:bg-primary-glow"
            >
              Lihat Jadual
            </a>
            <a
              href="#keputusan"
              className="hero-chip inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary"
            >
              Keputusan
            </a>
            <a
              href="#media"
              className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-6 py-3 text-sm font-bold text-accent backdrop-blur-md transition hover:bg-accent/25"
            >
              YouTube
            </a>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl" />
            <div className="hero-logo-card relative rounded-3xl p-6 sm:p-8">
              <Image
                src="/logo-msspk.png"
                alt="Logo Majlis Sukan Sekolah Perak (MSSPk)"
                width={280}
                height={274}
                className="mx-auto h-auto w-48 object-contain sm:w-56 lg:w-64"
                priority
              />
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Majlis Sukan Sekolah Perak
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
