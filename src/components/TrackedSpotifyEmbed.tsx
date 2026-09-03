"use client";

import { useEffect, useRef } from "react";
import { trackClick } from "@/lib/track-client";

type TrackedSpotifyEmbedProps = {
  trackId: string;
  title: string;
};

export default function TrackedSpotifyEmbed({
  trackId,
  title,
}: TrackedSpotifyEmbedProps) {
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
          trackClick("music", `Spotify — ${title}`);
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
  }, [title]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      title={`${title} en Spotify`}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
