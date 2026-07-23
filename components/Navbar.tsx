"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem, SiteConfig } from "@/lib/types";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Hash links (#jadual) only work on home page.
 * On other routes (e.g. /carta-kalah), prefix with "/" so navigation works.
 */
function resolveNavHref(href: string, pathname: string) {
  if (!href) return "/";
  // Absolute path or external
  if (href.startsWith("http") || href.startsWith("/")) {
    return href;
  }
  // Hash-only → always point at home page section
  if (href.startsWith("#")) {
    // On home, keep bare hash for smooth scroll; off-home use /#id
    if (pathname === "/" || pathname === "") {
      return href;
    }
    return `/${href}`;
  }
  return href;
}

export function Navbar({ site }: { site: SiteConfig }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) {
        setDesktopOpen(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setDesktopOpen(null);
    setMobileOpen(null);
  }, [pathname]);

  function closeAll() {
    setOpen(false);
    setDesktopOpen(null);
    setMobileOpen(null);
  }

  const homeHref = resolveNavHref("#utama", pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "glass" : "bg-transparent"
      }`}
    >
      <div
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        <a href={homeHref} className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo-msspk.png"
            alt="Logo Majlis Sukan Sekolah Perak"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 object-contain"
            priority
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold tracking-wide text-accent sm:text-base">
              {site.event.shortName}
            </p>
            <p className="hidden text-xs text-muted sm:block">
              MSS Perak · {site.event.year}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Utama">
          {site.nav.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              pathname={pathname}
              openKey={desktopOpen}
              setOpenKey={setDesktopOpen}
              onNavigate={closeAll}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-card-border p-2 text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="max-h-[min(70vh,520px)] overflow-y-auto border-t border-card-border px-4 py-3 lg:hidden"
          aria-label="Menu mudah alih"
        >
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                pathname={pathname}
                openKey={mobileOpen}
                setOpenKey={setMobileOpen}
                onNavigate={closeAll}
              />
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function DesktopNavItem({
  item,
  pathname,
  openKey,
  setOpenKey,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
  onNavigate: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openKey === item.label;
  const href = resolveNavHref(item.href, pathname);

  if (!hasChildren) {
    return (
      <a
        href={href}
        className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-[var(--nav-hover)] hover:text-foreground"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-[var(--nav-hover)] hover:text-foreground ${
          isOpen ? "bg-[var(--nav-hover)] text-foreground" : "text-muted"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={(e) => {
          e.stopPropagation();
          setOpenKey(isOpen ? null : item.label);
        }}
      >
        {item.label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`transition ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[240px] overflow-hidden rounded-xl border border-card-border bg-card py-1 shadow-[var(--shadow-soft)]"
        >
          {item.children!.map((child) => (
            <a
              key={child.href + child.label}
              role="menuitem"
              href={resolveNavHref(child.href, pathname)}
              onClick={onNavigate}
              className="block px-4 py-2.5 text-sm text-muted transition hover:bg-[var(--nav-hover)] hover:text-foreground"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({
  item,
  pathname,
  openKey,
  setOpenKey,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
  onNavigate: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openKey === item.label;
  const href = resolveNavHref(item.href, pathname);

  if (!hasChildren) {
    return (
      <li>
        <a
          href={href}
          onClick={onNavigate}
          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-[var(--nav-hover)]"
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li className="rounded-lg border border-card-border/60">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-[var(--nav-hover)]"
        aria-expanded={isOpen}
        onClick={() => setOpenKey(isOpen ? null : item.label)}
      >
        {item.label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && (
        <ul className="border-t border-card-border/60 px-2 py-1">
          {item.children!.map((child) => (
            <li key={child.href + child.label}>
              <a
                href={resolveNavHref(child.href, pathname)}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-[var(--nav-hover)] hover:text-foreground"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
