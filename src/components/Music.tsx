"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import TrackedLink from "@/components/TrackedLink";

type PlatformKey = "spotify" | "apple" | "youtube" | "tidal" | "amazon" | "deezer";

type Platform = {
  key: PlatformKey;
  name: string;
  icon: ReactNode;
  color: string;
  hoverClass: string;
  albumUrl: string;
};

type Track = {
  number: number;
  title: string;
  duration: string;
  explicit?: boolean;
  links: Record<PlatformKey, string>;
};

const icons = {
  spotify: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.51 17.308a.748.748 0 01-1.03.249c-2.82-1.724-6.37-2.113-10.55-1.158a.75.75 0 11-.334-1.462c4.574-1.045 8.5-.596 11.665 1.338a.75.75 0 01.249 1.033zm1.473-3.275a.937.937 0 01-1.29.308c-3.23-1.985-8.153-2.56-11.976-1.4a.938.938 0 11-.544-1.794c4.37-1.326 9.795-.684 13.502 1.594a.937.937 0 01.308 1.292zm.127-3.41C15.237 8.323 8.844 8.11 5.147 9.23a1.124 1.124 0 11-.652-2.151c4.245-1.287 11.306-1.037 15.762 1.607a1.125 1.125 0 01-1.147 1.936z" />
    </svg>
  ),
  apple: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.1zM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  ),
  youtube: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  tidal: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L8 6l4 4 4-4-4-4zM4 10l-4 4 4 4 4-4-4-4zm8 0l-4 4 4 4 4-4-4-4zm8 0l-4 4 4 4 4-4-4-4z" />
    </svg>
  ),
  amazon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.98 14.815c-.305.225-.746.345-1.127.345-1.575 0-2.97-1.215-2.97-3.525 0-1.8.99-2.7 2.7-2.7.45 0 .945.09 1.395.27v5.61zm3.12 2.34c-.36-.495-.735-.9-.735-1.83V9.24c0-2.58-1.74-3.45-4.005-3.45-1.275 0-2.73.345-3.705 1.065-.45.33-.39.87-.12 1.245l.705.975c.255.375.69.405 1.08.135.6-.42 1.29-.63 1.95-.63 1.08 0 1.71.405 1.71 1.5v.57c-.495-.105-1.005-.18-1.5-.18-3.015 0-5.16 1.575-5.16 4.62 0 2.43 1.53 4.05 3.72 4.05 1.305 0 2.46-.51 3.255-1.485.33.525.75.96 1.245 1.365.345.285.81.255 1.125-.06l.81-.81c.285-.285.3-.675.075-1.005h-.45zM20.76 20.04c-2.34 1.725-5.73 2.64-8.655 2.64-4.095 0-7.785-1.515-10.575-4.035-.225-.21-.03-.495.255-.33 3.015 1.755 6.735 2.805 10.59 2.805 2.595 0 5.445-.54 8.07-1.65.39-.165.72.255.315.57zm.99-1.35c-.3-.39-1.98-.18-2.73-.09-.225.03-.255-.165-.06-.3 1.29-.9 3.405-.645 3.645-.345.24.3-.06 2.4-1.275 3.42-.18.15-.36.075-.27-.135.3-.69.99-2.16.69-2.55z" />
    </svg>
  ),
  deezer: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM0 12.61v3.027h5.19v-3.03H0zm6.27 0v3.027h5.189v-3.03h-5.19zm6.27 0v3.027h5.19v-3.03h-5.19zm6.27 0v3.027H24v-3.03h-5.19zM0 16.84v3.027h5.19v-3.03H0zm6.27 0v3.027h5.189v-3.03h-5.19zm6.27 0v3.027h5.19v-3.03h-5.19zm6.27 0v3.027H24v-3.03h-5.19z" />
    </svg>
  ),
};

const platforms: Platform[] = [
  { key: "spotify", name: "Spotify", icon: icons.spotify, color: "#1ED760", hoverClass: "hover:border-[#1ED760]/70 hover:bg-[#1ED760]/10", albumUrl: "https://open.spotify.com/album/5d63rjV9bWDZtUpRYIfCLk" },
  { key: "apple", name: "Apple Music", icon: icons.apple, color: "#FA57C1", hoverClass: "hover:border-[#FA57C1]/70 hover:bg-[#FA57C1]/10", albumUrl: "https://music.apple.com/cl/album/es-as%C3%AD/6802748898" },
  { key: "youtube", name: "YouTube Music", icon: icons.youtube, color: "#FF4E45", hoverClass: "hover:border-[#FF4E45]/70 hover:bg-[#FF4E45]/10", albumUrl: "https://music.youtube.com/playlist?list=OLAK5uy_l2b7vjESUbUmCNAJFh73HP0iGvKdojcrI" },
  { key: "tidal", name: "Tidal", icon: icons.tidal, color: "#f2f4f7", hoverClass: "hover:border-white/70 hover:bg-white/10", albumUrl: "https://tidal.com/album/553466591" },
  { key: "amazon", name: "Amazon Music", icon: icons.amazon, color: "#25D1DA", hoverClass: "hover:border-[#25D1DA]/70 hover:bg-[#25D1DA]/10", albumUrl: "https://music.amazon.com/search/Oleajes%20Es%20as%C3%AD" },
  { key: "deezer", name: "Deezer", icon: icons.deezer, color: "#A16BFF", hoverClass: "hover:border-[#A16BFF]/70 hover:bg-[#A16BFF]/10", albumUrl: "https://www.deezer.com/album/1057319292" },
];

const amazonSearch = (title: string) => `https://music.amazon.com/search/${encodeURIComponent(`Oleajes ${title}`)}`;
const youtubeAlbum = "OLAK5uy_l2b7vjESUbUmCNAJFh73HP0iGvKdojcrI";
const youtubeTrack = (id: string) => `https://music.youtube.com/watch?v=${id}&list=${youtubeAlbum}`;

const tracks: Track[] = [
  { number: 1, title: "Ya no doy más", duration: "3:11", links: { spotify: "https://open.spotify.com/track/6KGlXqV4YSvCO7MwGB3BUB", apple: "https://music.apple.com/cl/album/ya-no-doy-m%C3%A1s/6802748898?i=6802748901", youtube: youtubeTrack("yZtfng9PsdQ"), tidal: "https://tidal.com/track/553466593", amazon: amazonSearch("Ya no doy más"), deezer: "https://www.deezer.com/track/4231443292" } },
  { number: 2, title: "Abejas", duration: "4:25", links: { spotify: "https://open.spotify.com/track/6WLo2iGTOBAei0gd2PlBA5", apple: "https://music.apple.com/cl/album/abejas/6802748898?i=6802748908", youtube: youtubeTrack("jfF7I8oVFPU"), tidal: "https://tidal.com/track/553466594", amazon: amazonSearch("Abejas"), deezer: "https://www.deezer.com/track/4231443302" } },
  { number: 3, title: "Mujer Artificial", duration: "4:40", links: { spotify: "https://open.spotify.com/track/3J8RX9tROW64lIZlZYwwaV", apple: "https://music.apple.com/cl/album/mujer-artificial/6802748898?i=6802748909", youtube: youtubeTrack("5_TN_66oCRY"), tidal: "https://tidal.com/track/553466595", amazon: amazonSearch("Mujer Artificial"), deezer: "https://www.deezer.com/track/4231443312" } },
  { number: 4, title: "Esto enreda todo", duration: "3:40", links: { spotify: "https://open.spotify.com/track/1qaKwW0Yt7aI9isySohmuB", apple: "https://music.apple.com/cl/album/esto-enreda-todo/6802748898?i=6802748910", youtube: youtubeTrack("LbavxGQwtm4"), tidal: "https://tidal.com/track/553466596", amazon: amazonSearch("Esto enreda todo"), deezer: "https://www.deezer.com/track/4231443322" } },
  { number: 5, title: "Qué he formado", duration: "3:09", links: { spotify: "https://open.spotify.com/track/1E95v665KcQtclXPeLHKPz", apple: "https://music.apple.com/cl/album/qu%C3%A9-he-formado/6802748898?i=6802748911", youtube: youtubeTrack("IJVWNGEHR-8"), tidal: "https://tidal.com/track/553466597", amazon: amazonSearch("Qué he formado"), deezer: "https://www.deezer.com/track/4231443332" } },
  { number: 6, title: "Pantera", duration: "3:56", links: { spotify: "https://open.spotify.com/track/0pwJGb7w6S8G3v9WUdUTuR", apple: "https://music.apple.com/cl/album/pantera/6802748898?i=6802748912", youtube: youtubeTrack("hSjQBmOJA-g"), tidal: "https://tidal.com/track/553466598", amazon: amazonSearch("Pantera"), deezer: "https://www.deezer.com/track/4231443342" } },
  { number: 7, title: "Almohadas", duration: "3:21", links: { spotify: "https://open.spotify.com/track/1c7RhjvJjnvuY97AWQfF35", apple: "https://music.apple.com/cl/album/almohadas/6802748898?i=6802748913", youtube: youtubeTrack("RYHLRyfbmho"), tidal: "https://tidal.com/track/553466599", amazon: amazonSearch("Almohadas"), deezer: "https://www.deezer.com/track/4231443352" } },
  { number: 8, title: "Rebeldía de amar", duration: "3:26", links: { spotify: "https://open.spotify.com/track/5W0x4HvWRDoQfVX282YGrb", apple: "https://music.apple.com/cl/album/rebeld%C3%ADa-de-amar/6802748898?i=6802748914", youtube: youtubeTrack("rzlotXzQOk0"), tidal: "https://tidal.com/track/553466600", amazon: amazonSearch("Rebeldía de amar"), deezer: "https://www.deezer.com/track/4231443362" } },
  { number: 9, title: "Droga depresora", duration: "3:16", explicit: true, links: { spotify: "https://open.spotify.com/track/2MFbarCY8glBOBGiV9yE5s", apple: "https://music.apple.com/cl/album/droga-depresora/6802748898?i=6802748917", youtube: youtubeTrack("LgnB9K85koY"), tidal: "https://tidal.com/track/553466601", amazon: amazonSearch("Droga depresora"), deezer: "https://www.deezer.com/track/4231443372" } },
  { number: 10, title: "Sí puedo", duration: "5:38", links: { spotify: "https://open.spotify.com/track/1CdVCcXEHDShoQzfR94vCj", apple: "https://music.apple.com/cl/album/s%C3%AD-puedo/6802748898?i=6802748918", youtube: youtubeTrack("u8Nq8NPnXPI"), tidal: "https://tidal.com/track/553466602", amazon: amazonSearch("Sí puedo"), deezer: "https://www.deezer.com/track/4231443382" } },
];

export default function Music() {
  const [openTrack, setOpenTrack] = useState<number | null>(null);

  return (
    <section id="musica" className="relative overflow-hidden bg-[#0d1520] px-4 py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 opacity-30"><div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] via-transparent to-[#1a2634]" /></div>
      <div className="city-pattern absolute bottom-0 left-0 right-0 h-48 opacity-20" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <span className="neon-flicker font-[family-name:var(--font-space)] text-xs uppercase tracking-[0.3em] text-[#4a9ebb]">Ya disponible</span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#c5d1de] sm:text-5xl md:text-6xl">Es así</h2>
          <p className="mt-4 font-[family-name:var(--font-space)] text-sm uppercase tracking-[0.22em] text-[#7a8a9a]">El nuevo álbum de Oleajes</p>
        </header>

        <div className="relative mb-14 border border-[#4a9ebb]/25 bg-[#080d13]/85 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-6 lg:p-8">
          <div className="absolute -left-px -top-px h-12 w-12 border-l border-t border-[#7ec8e3]/70" />
          <div className="absolute -bottom-px -right-px h-12 w-12 border-b border-r border-[#7ec8e3]/70" />
          <div className="grid gap-7 md:grid-cols-[minmax(260px,380px)_1fr] md:items-center lg:gap-12">
            <div className="group relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden bg-[#111923]">
              <div className="absolute -inset-8 z-0 bg-[#4a9ebb]/20 blur-3xl" />
              <Image src="/images/portada-oleajes.png" alt="Portada de Es así, álbum de Oleajes" width={2999} height={2999} sizes="(max-width: 768px) 90vw, 380px" className="wet-photo relative z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="pointer-events-none absolute inset-0 z-20 ring-1 ring-inset ring-white/10" />
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#4a9ebb]">Álbum · 2026</p>
              <h3 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#e4edf5] sm:text-5xl lg:text-6xl">Es así</h3>
              <p className="mt-2 font-[family-name:var(--font-space)] text-lg text-[#a8b7c5]">Oleajes</p>
              <p className="mt-5 max-w-md font-[family-name:var(--font-space)] text-sm leading-7 text-[#7a8a9a]">Diez canciones. Treinta y ocho minutos de Oleajes. El disco completo ya está afuera.</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#718293]">
                <span>10 canciones</span><span aria-hidden="true" className="h-1 w-1 bg-[#4a9ebb]" /><span>38:48</span><span aria-hidden="true" className="h-1 w-1 bg-[#4a9ebb]" /><span>Vivario Records</span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {platforms.map((platform) => (
                  <TrackedLink key={platform.key} href={platform.albumUrl} analyticsCategory="music" analyticsLabel={`${platform.name} — Es así (álbum)`} target="_blank" rel="noopener noreferrer" className={`flex min-h-11 items-center gap-2 border border-[#2d3d4f]/70 px-3 py-2 font-[family-name:var(--font-space)] text-xs text-[#c5d1de] transition-all ${platform.hoverClass}`}>
                    <span style={{ color: platform.color }}>{platform.icon}</span><span>{platform.name}</span>
                  </TrackedLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#2d3d4f]/60 pb-4">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#4a9ebb]">Lado A + Lado B</p><h3 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-[#d7e1ea]">Canciones</h3></div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[#667788] sm:block">Elige dónde escuchar</span>
          </div>

          <ol className="border-x border-t border-[#2d3d4f]/50">
            {tracks.map((track) => {
              const isOpen = openTrack === track.number;
              return (
                <li key={track.number} className="border-b border-[#2d3d4f]/50 bg-[#0a0c10]/55 transition-colors hover:bg-[#111923]/85">
                  <div className="grid min-h-16 grid-cols-[2rem_1fr_auto] items-center gap-3 px-3 sm:grid-cols-[2.5rem_1fr_auto_auto] sm:px-5">
                    <span className="font-mono text-xs text-[#4a9ebb]/75">{String(track.number).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-[family-name:var(--font-space)] text-sm font-medium text-[#c5d1de] sm:text-base">{track.title}</span>
                        {track.explicit && <span className="border border-[#667788] px-1 font-mono text-[8px] leading-3 text-[#8998a7]" title="Contenido explícito">E</span>}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#657585] sm:hidden">{track.duration}</span>
                    </div>
                    <span className="hidden font-mono text-xs text-[#657585] sm:block">{track.duration}</span>
                    <button type="button" onClick={() => setOpenTrack(isOpen ? null : track.number)} aria-label={`Plataformas para ${track.title}`} aria-expanded={isOpen} aria-controls={`track-platforms-${track.number}`} className="flex min-h-10 items-center gap-2 px-2 font-[family-name:var(--font-space)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8e9dac] transition-colors hover:text-[#7ec8e3] sm:px-3">
                      <span className="hidden sm:inline">Plataformas</span>
                      <svg className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                      <span className="sr-only"> para {track.title}</span>
                    </button>
                  </div>

                  <div id={`track-platforms-${track.number}`} aria-hidden={!isOpen} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-2 border-t border-[#2d3d4f]/35 bg-[#080d13]/70 p-3 sm:grid-cols-3 sm:px-5 lg:grid-cols-6">
                        {platforms.map((platform) => (
                          <TrackedLink key={platform.key} href={track.links[platform.key]} analyticsCategory="music" analyticsLabel={`${platform.name} — ${track.title}`} target="_blank" rel="noopener noreferrer" className={`flex min-h-10 items-center gap-2 border border-[#2d3d4f]/60 px-3 py-2 font-[family-name:var(--font-space)] text-[11px] text-[#aebbc7] transition-all ${platform.hoverClass}`}>
                            <span style={{ color: platform.color }}>{platform.icon}</span><span className="truncate">{platform.name}</span>
                          </TrackedLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#536474]">℗ 2026 Vivario Records</p>
        </div>
      </div>
      <div className="water-ripple absolute bottom-0 left-0 right-0 h-24" />
    </section>
  );
}
