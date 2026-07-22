import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminPassword } from "@/lib/admin-auth";
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

export async function GET(request: Request) {
  if (!checkAdminPassword(getPassword(request))) {
    return unauthorized();
  }
  try {
    const config = getSite();
    return NextResponse.json({ ok: true, config });
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
    const body = (await request.json()) as { config?: unknown };
    if (!isValidSiteConfig(body.config)) {
      return NextResponse.json(
        { ok: false, error: "Struktur config tidak sah" },
        { status: 400 },
      );
    }

    const config = body.config as SiteConfig;
    // Normalisasi year ke number
    if (typeof config.event.year === "string") {
      config.event.year = Number(config.event.year) || config.event.year;
    }

    const path = getSiteConfigPath();
    const json = JSON.stringify(config, null, 2) + "\n";

    try {
      await writeFile(path, json, "utf8");
    } catch (writeErr) {
      // Vercel filesystem read-only — pulangkan JSON untuk muat turun
      return NextResponse.json({
        ok: true,
        saved: false,
        warning:
          "Fail tidak dapat ditulis (hosting read-only). Muat turun JSON dan commit ke repo, atau simpan secara local.",
        config,
        download: json,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({
      ok: true,
      saved: true,
      message: "Config disimpan ke content/site-config.json",
      config: getSite(),
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
