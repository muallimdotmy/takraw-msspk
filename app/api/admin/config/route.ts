import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminPassword } from "@/lib/admin-auth";
import {
  getAdminSources,
  saveAdminSources,
  type AdminSources,
  type SheetSource,
} from "@/lib/admin-sources";
import { getSite, getSiteConfigPath, isValidSiteConfig } from "@/lib/get-site";
import type { SiteConfig } from "@/lib/types";

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Tidak dibenarkan" },
    { status: 401 },
  );
}

function getPassword(request: Request) {
  return request.headers.get("x-admin-password");
}

function extractFileId(url: string) {
  const m = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return m ? m[1] : "";
}

function normalizeSheet(
  s: Partial<SheetSource> | undefined,
  fallbackLabel: string,
): SheetSource {
  const sheetUrl = (s?.sheetUrl || "").trim();
  return {
    sheetUrl,
    fileId: (s?.fileId || "").trim() || extractFileId(sheetUrl),
    label: s?.label || fallbackLabel,
  };
}

export async function GET(request: Request) {
  if (!checkAdminPassword(getPassword(request))) {
    return unauthorized();
  }
  try {
    const config = getSite();
    let sources: AdminSources | null = null;
    try {
      sources = getAdminSources();
    } catch {
      sources = null;
    }
    return NextResponse.json({ ok: true, config, sources });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Gagal baca config",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!checkAdminPassword(getPassword(request))) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as {
      config?: unknown;
      sources?: Partial<AdminSources>;
    };
    if (!isValidSiteConfig(body.config)) {
      return NextResponse.json(
        { ok: false, error: "Struktur config tidak sah" },
        { status: 400 },
      );
    }

    const config = body.config as SiteConfig;
    if (typeof config.event.year === "string") {
      config.event.year = Number(config.event.year) || config.event.year;
    }

    if (config.links) config.links.jadualSheet = "";
    if (config.embeds) {
      config.embeds.jadualSheet = "";
      config.embeds.jadual = { u12: "", u15: "", u18: "" };
    }

    const configPath = getSiteConfigPath();
    const configJson = JSON.stringify(config, null, 2) + "\n";

    let sources: AdminSources | null = null;
    if (body.sources) {
      sources = {
        berpasukan: normalizeSheet(
          body.sources.berpasukan,
          "Regu Berpasukan — jadual & keputusan",
        ),
        quadrant: normalizeSheet(
          body.sources.quadrant,
          "Quadrant — jadual & keputusan",
        ),
        purpose:
          body.sources.purpose ||
          "Pautan Google Sheet rujukan admin sahaja — tidak dipaparkan di laman awam",
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      await writeFile(configPath, configJson, "utf8");
      if (sources) saveAdminSources(sources);
    } catch {
      return NextResponse.json({
        ok: true,
        saved: false,
        warning:
          "Fail tidak dapat ditulis (hosting read-only). Muat turun JSON dan commit ke repo.",
        config,
        sources: sources || getAdminSourcesSafe(),
        download: configJson,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({
      ok: true,
      saved: true,
      message:
        "Config disimpan. Pautan sheet (Berpasukan & Quadrant) kekal admin sahaja.",
      config: getSite(),
      sources: getAdminSourcesSafe(),
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Gagal simpan",
      },
      { status: 500 },
    );
  }
}

function getAdminSourcesSafe(): AdminSources | null {
  try {
    return getAdminSources();
  } catch {
    return null;
  }
}
