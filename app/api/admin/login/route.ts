import { NextResponse } from "next/server";
import { checkAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!checkAdminPassword(body.password)) {
      return NextResponse.json(
        { ok: false, error: "Kata laluan salah" },
        { status: 401 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Permintaan tidak sah" },
      { status: 400 },
    );
  }
}
