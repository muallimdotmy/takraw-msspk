import Image from "next/image";

export function EventBanner() {
  return (
    <section
      aria-label="Banner kejohanan"
      className="relative z-0 -mt-4 pb-2 sm:-mt-6 sm:pb-4"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-soft)]">
          <Image
            src="/banner-msspk.png"
            alt="Banner Kejohanan Sepak Takraw MSS Perak"
            width={1280}
            height={640}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
