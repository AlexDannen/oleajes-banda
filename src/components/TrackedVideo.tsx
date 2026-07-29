"use client";

import { useState } from "react";
import { trackClick } from "@/lib/track-client";

type TrackedVideoProps = {
  videoId: string;
  title: string;
};

export default function TrackedVideo({ videoId, title }: TrackedVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        trackClick("video", title);
        setPlaying(true);
      }}
      className="group/video relative h-full w-full overflow-hidden bg-[#0a0c10] text-left"
      aria-label={`Reproducir ${title}`}
    >
      <span
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover/video:scale-105"
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }}
      />
      <span className="absolute inset-0 bg-black/25 transition group-hover/video:bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/70 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition group-hover/video:scale-110 group-hover/video:bg-[#FF0000]">
        <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
      </span>
    </button>
  );
}
