import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminIsConfigured,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (process.env.NODE_ENV === "production" && !adminIsConfigured()) {
    return NextResponse.json(
      { error: "Falta configurar la contraseña del panel en el servidor." },
      { status: 503 },
    );
  }

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const session = createAdminSession();
  if (!session) {
    return NextResponse.json({ error: "El panel no está configurado." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}
