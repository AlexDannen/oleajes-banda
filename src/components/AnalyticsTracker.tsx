"use client";

import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/track-client";

export default function AnalyticsTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || navigator.webdriver) return;
    tracked.current = true;
    trackPageView();
  }, []);

  return null;
}
