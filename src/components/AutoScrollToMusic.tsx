"use client";

import { useEffect } from "react";

export default function AutoScrollToMusic() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("musica")?.scrollIntoView({ behavior: "smooth" });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
