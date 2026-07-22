import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSite } from "@/lib/get-site";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const themeInit = `(function(){try{var k='msspk-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(t);d.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const site = getSite();
    return {
      title: {
        default: `${site.event.shortName} ${site.event.year} | ${site.event.name}`,
        template: `%s | ${site.event.shortName}`,
      },
      description: `${site.event.name} (${site.event.dates}) di ${site.event.venueFull}. Jadual, keputusan, galeri dan media kejohanan.`,
      metadataBase: new URL("https://takraw-msspk.vercel.app"),
      openGraph: {
        title: `${site.event.shortName} ${site.event.year}`,
        description: `${site.event.name} · ${site.event.dates} · ${site.event.venue}`,
        locale: "ms_MY",
        type: "website",
        images: [
          {
            url: "/logo-msspk.png",
            width: 400,
            height: 392,
            alt: "Logo MSSPk",
          },
        ],
      },
      twitter: {
        card: "summary",
        title: `${site.event.shortName} ${site.event.year}`,
        description: `${site.event.name} · ${site.event.dates}`,
        images: ["/logo-msspk.png"],
      },
      icons: {
        icon: "/logo-msspk.png",
        apple: "/logo-msspk.png",
      },
    };
  } catch {
    return {
      title: "TAKRAW MSSPk",
      description: "Kejohanan Sepak Takraw MSS Perak",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${body.variable} ${display.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
