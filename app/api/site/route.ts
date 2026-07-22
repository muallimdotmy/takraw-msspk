import { NextResponse } from "next/server";
import { getSite } from "@/lib/get-site";

/** Public — baca config semasa (untuk debug / client refresh) */
export async function GET() {
  try {
    const config = getSite();
    return NextResponse.json(config, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal baca site" },
      { status: 500 },
    );
  }
}
