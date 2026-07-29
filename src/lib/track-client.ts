"use client";

import type { AnalyticsCategory } from "@/lib/analytics";

const visitorStorageKey = "oleajes_visitor_id";
let memoryVisitorId: string | null = null;

function visitorId() {
  if (memoryVisitorId) return memoryVisitorId;

  try {
    let id = window.localStorage.getItem(visitorStorageKey);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(visitorStorageKey, id);
    }
    memoryVisitorId = id;
  } catch {
    memoryVisitorId = crypto.randomUUID();
  }

  return memoryVisitorId;
}

function send(payload: Record<string, string>) {
  const body = JSON.stringify({ ...payload, visitorId: visitorId() });

  if (navigator.sendBeacon) {
    const accepted = navigator.sendBeacon(
      "/api/analytics",
      new Blob([body], { type: "application/json" }),
    );
    if (accepted) return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });
}

export function trackPageView() {
  send({ type: "page_view" });
}

export function trackClick(category: AnalyticsCategory, label: string) {
  send({ type: "click", category, label });
}
