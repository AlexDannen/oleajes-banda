"use client";

import { useEffect, useRef } from "react";
import { trackClick } from "@/lib/track-client";

export default function TrackedSpotifyEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const trackedCurrentFocus = useRef(false);

  useEffect(() => {
    function handleWindowBlur() {
      window.requestAnimationFrame(() => {
        if (
          document.activeElement === iframeRef.current &&
          !trackedCurrentFocus.current
        ) {
          trackedCurrentFocus.current = true;
          trackClick("music", "Spotify — Ya no doy más");
        }
      });
    }

    function handleWindowFocus() {
      trackedCurrentFocus.current = false;
    }

    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://open.spotify.com/embed/track/16rBW4d1nbt7CddJWaUDXO?utm_source=generator&theme=0"
      title="Ya no doy más en Spotify"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
