import { NextResponse } from "next/server";
import {
  recordClick,
  recordPageView,
  type AnalyticsCategory,
} from "@/lib/analytics";

export const runtime = "nodejs";

const categories = new Set<AnalyticsCategory>(["music", "video", "social"]);

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      type?: string;
      visitorId?: string;
      category?: AnalyticsCategory;
      label?: string;
    };

    if (!body.visitorId || body.visitorId.length < 8 || body.visitorId.length > 100) {
      return NextResponse.json({ error: "Identificador inválido" }, { status: 400 });
    }

    if (body.type === "page_view") {
      await recordPageView(body.visitorId);
    } else if (
      body.type === "click" &&
      body.category &&
      categories.has(body.category) &&
      body.label &&
      body.label.length <= 80
    ) {
      await recordClick(body.visitorId, body.category, body.label.trim());
    } else {
      return NextResponse.json({ error: "Evento inválido" }, { status: 400 });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "No se pudo registrar el evento" }, { status: 400 });
  }
}
