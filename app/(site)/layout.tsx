import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSite } from "@/lib/get-site";

export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSite();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: site.event.name,
    startDate: site.event.startDate,
    endDate: site.event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: site.event.venue,
      address: site.event.venueFull,
    },
    organizer: {
      "@type": "Organization",
      name: site.event.organizer,
    },
    description: `Kejohanan Sepak Takraw MSS Perak ${site.event.year}`,
    image: "/logo-msspk.png",
  };

  return (
    <div className="bg-court flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </div>
  );
}
