"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

// Iconos de plataformas
const PlatformIcons = {
  spotify: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.19-2.48-.86-.633-.608-.874-1.374-.766-2.23.1-.785.52-1.385 1.162-1.822.457-.31.97-.49 1.508-.593.64-.122 1.288-.19 1.93-.3.205-.036.41-.08.608-.14.133-.04.198-.14.197-.275-.005-.648 0-1.296-.002-1.943 0-.097-.025-.166-.126-.2-.166-.053-.332-.11-.503-.13-.533-.06-1.066-.115-1.6-.163-.616-.055-1.23-.127-1.835-.27-.894-.21-1.683-.607-2.266-1.332-.39-.485-.6-1.046-.69-1.66-.078-.527-.045-1.048.097-1.562.318-1.153 1.056-1.96 2.1-2.487.61-.308 1.268-.45 1.94-.515.693-.066 1.385-.053 2.072.072.665.12 1.29.354 1.85.736.608.414 1.03.964 1.25 1.66.11.35.16.71.17 1.077.01.476.004.953.005 1.43v2.866z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  tidal: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 3.992L8.008 7.996 12.012 12l4.004-4.004L12.012 3.992zM4.004 12L0 16.004 4.004 20.008 8.008 16.004 4.004 12zM12.012 12L8.008 16.004 12.012 20.008 16.016 16.004 12.012 12zM20.02 12L16.016 16.004 20.02 20.008 24.024 16.004 20.02 12z"/>
    </svg>
  ),
  amazon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.492.124.09.144.07.293-.06.446-.325.373-.745.71-1.26 1.01-1.86 1.083-4.12 1.71-6.78 1.882-2.66.17-5.04-.13-7.14-.91-2.1-.78-3.9-1.91-5.4-3.39-.26-.26-.3-.46-.12-.61l.005.18zM6.254 14.56c.36.852.702 1.55 1.026 2.092.198.33.46.69.78 1.08.32.39.58.62.79.68.21.06.56-.04 1.05-.29.49-.25.74-.62.74-1.12 0-.5-.24-.88-.72-1.14-.48-.26-1.19-.53-2.14-.8-.94-.28-1.56-.62-1.85-1.03-.29-.41-.43-.95-.43-1.62 0-.67.21-1.25.64-1.73.43-.48 1-.84 1.72-1.06.72-.22 1.49-.34 2.29-.34.8 0 1.48.12 2.05.35.56.23.96.62 1.19 1.17.23.55.34 1.3.34 2.25h-2.28c0-.74-.11-1.26-.32-1.58-.22-.31-.55-.47-1-.47-.45 0-.81.14-1.08.43-.27.29-.4.65-.4 1.08 0 .43.09.75.27.97.18.22.48.41.88.58.41.17.96.36 1.66.56s1.26.42 1.68.65c.42.23.77.55 1.04.97.27.41.41.99.41 1.72 0 .74-.19 1.4-.56 1.99-.37.59-.91 1.05-1.6 1.38-.7.33-1.52.49-2.46.49-.95 0-1.8-.17-2.56-.52-.76-.35-1.35-.87-1.76-1.57-.41-.7-.62-1.53-.62-2.49h2.28c0 .4.05.75.15 1.04z"/>
    </svg>
  ),
  deezer: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM0 12.61v3.027h5.19v-3.03H0zm6.27 0v3.027h5.189v-3.03h-5.19zm6.27 0v3.027h5.19v-3.03h-5.19zm6.27 0v3.027H24v-3.03h-5.19zM0 16.84v3.027h5.19v-3.03H0zm6.27 0v3.027h5.189v-3.03h-5.19zm6.27 0v3.027h5.19v-3.03h-5.19zm6.27 0v3.027H24v-3.03h-5.19z"/>
    </svg>
  ),
  soundcloud: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899 1.025c-.051 0-.091.039-.099.085l-.16 1.13.16 1.107c.008.049.048.085.099.085.05 0 .09-.036.098-.085l.18-1.107-.18-1.13c-.008-.046-.048-.085-.098-.085zM2.28 10.96c-.059 0-.107.05-.116.107l-.196 3.314.196 3.167c.009.06.057.107.116.107.06 0 .107-.047.117-.107l.22-3.167-.22-3.314c-.01-.057-.057-.107-.117-.107zm.987.135c-.066 0-.12.057-.129.122l-.165 3.184.165 3.052c.009.066.063.12.129.12.066 0 .119-.054.129-.12l.185-3.052-.185-3.184c-.01-.065-.063-.122-.129-.122zm1.06-.314c-.073 0-.133.063-.14.135l-.156 3.498.156 3.003c.007.072.067.135.14.135.074 0 .134-.063.14-.135l.176-3.003-.176-3.498c-.006-.072-.066-.135-.14-.135zm1.055-.363c-.08 0-.146.07-.153.149l-.147 3.86.147 2.942c.007.08.073.15.153.15.08 0 .145-.07.153-.15l.166-2.942-.166-3.86c-.008-.079-.073-.15-.153-.15zm1.063-.2c-.088 0-.159.076-.166.162l-.138 4.062.138 2.878c.007.087.078.16.166.16.087 0 .158-.073.166-.16l.156-2.878-.156-4.062c-.008-.086-.079-.162-.166-.162zm1.063-.192c-.094 0-.17.083-.178.176l-.13 4.254.13 2.815c.008.093.084.176.178.176.095 0 .17-.083.178-.176l.146-2.815-.146-4.254c-.008-.093-.083-.176-.178-.176zm1.066.02c-.102 0-.184.09-.19.19l-.124 4.045.124 2.75c.006.1.088.19.19.19.101 0 .183-.09.19-.19l.138-2.75-.138-4.045c-.007-.1-.089-.19-.19-.19zm1.065-.203c-.107 0-.195.097-.203.203l-.115 4.248.115 2.686c.008.106.096.203.203.203.108 0 .195-.097.203-.203l.13-2.686-.13-4.248c-.008-.106-.095-.203-.203-.203zm1.07.13c-.114 0-.206.104-.213.217l-.108 4.118.108 2.62c.007.113.099.217.213.217.115 0 .206-.104.213-.217l.121-2.62-.121-4.118c-.007-.113-.098-.217-.213-.217zm1.066-.07c-.12 0-.217.11-.224.23l-.1 4.19.1 2.556c.007.12.104.23.224.23.121 0 .217-.11.224-.23l.112-2.556-.112-4.19c-.007-.12-.103-.23-.224-.23zm1.068-.078c-.128 0-.23.117-.238.244l-.092 4.267.092 2.49c.008.127.11.245.238.245.127 0 .23-.118.237-.245l.103-2.49-.103-4.267c-.007-.127-.11-.244-.237-.244zm1.538.153c-.106 0-.193.079-.21.184l-.084 4.073.084 2.395c.017.106.104.185.21.185.106 0 .193-.08.21-.185l.096-2.395-.096-4.073c-.017-.105-.104-.184-.21-.184zm1.075-.082c-.121 0-.22.092-.238.21l-.077 4.157.077 2.331c.018.118.117.21.238.21.121 0 .22-.092.238-.21l.086-2.33-.086-4.158c-.018-.118-.117-.21-.238-.21zm3.868 1.63c-.323 0-.63.052-.918.148-.185-2.09-1.935-3.737-4.085-3.737-.574 0-1.124.103-1.633.29-.196.072-.247.146-.249.29v7.574c.002.15.127.274.278.28h6.607c1.324 0 2.398-1.074 2.398-2.399s-1.074-2.447-2.398-2.447z"/>
    </svg>
  ),
};

type Platform = {
  name: string;
  icon: ReactNode;
  color: string;
  hoverColor: string;
};

const platforms: Platform[] = [
  { name: "Spotify", icon: PlatformIcons.spotify, color: "#1DB954", hoverColor: "hover:bg-[#1DB954]" },
  { name: "Apple Music", icon: PlatformIcons.apple, color: "#FA57C1", hoverColor: "hover:bg-[#FA57C1]" },
  { name: "YouTube Music", icon: PlatformIcons.youtube, color: "#FF0000", hoverColor: "hover:bg-[#FF0000]" },
  { name: "Tidal", icon: PlatformIcons.tidal, color: "#00FFFF", hoverColor: "hover:bg-[#00FFFF]" },
  { name: "Amazon Music", icon: PlatformIcons.amazon, color: "#FF9900", hoverColor: "hover:bg-[#FF9900]" },
  { name: "Deezer", icon: PlatformIcons.deezer, color: "#FEAA2D", hoverColor: "hover:bg-[#FEAA2D]" },
  { name: "SoundCloud", icon: PlatformIcons.soundcloud, color: "#FF5500", hoverColor: "hover:bg-[#FF5500]" },
];

// Plataformas sin Spotify (para el dropdown)
const otherPlatforms = platforms.filter(p => p.name !== "Spotify");

type Track = {
  name: string;
  spotifyId: string;
  links: { [key: string]: string };
};

type Album = {
  name: string;
  type: "EP" | "Album" | "Single";
  spotifyId: string;
  links: { [key: string]: string };
};

export default function Music() {
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);
  const [expandedAlbum, setExpandedAlbum] = useState<boolean>(false);
  const [isMusicVisible, setIsMusicVisible] = useState(false);
  const musicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMusicVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (musicRef.current) {
      observer.observe(musicRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Datos de las canciones con enlaces a todas las plataformas
  // TODO: Reemplazar con los enlaces reales de cada plataforma
  const tracks: Track[] = [
    {
      name: "Track 1",
      spotifyId: "2Ig29hWE7uKjzdRgnpVxxZ",
      links: {
        "Apple Music": "#",
        "YouTube Music": "#",
        "Tidal": "#",
        "Amazon Music": "#",
        "Deezer": "#",
        "SoundCloud": "#",
      },
    },
    {
      name: "Track 2",
      spotifyId: "4tLwjVDFeJRHv9dc2NTqof",
      links: {
        "Apple Music": "#",
        "YouTube Music": "#",
        "Tidal": "#",
        "Amazon Music": "#",
        "Deezer": "#",
        "SoundCloud": "#",
      },
    },
    {
      name: "Track 3",
      spotifyId: "6m4fuvcfD0ntXkIF0fmFIu",
      links: {
        "Apple Music": "#",
        "YouTube Music": "#",
        "Tidal": "#",
        "Amazon Music": "#",
        "Deezer": "#",
        "SoundCloud": "#",
      },
    },
  ];

  const album: Album = {
    name: "Nuestro EP",
    type: "EP",
    spotifyId: "6j08UGeTz4lEr0HMnjftRv",
    links: {
      "Apple Music": "#",
      "YouTube Music": "#",
      "Tidal": "#",
      "Amazon Music": "#",
      "Deezer": "#",
      "SoundCloud": "#",
    },
  };

  const toggleTrack = (index: number) => {
    setExpandedTrack(expandedTrack === index ? null : index);
  };

  return (
    <section id="musica" className="relative py-16 sm:py-24 md:py-32 px-4 bg-[#0d1520]">
      {/* Efecto de agua en el fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] via-transparent to-[#1a2634]" />
      </div>

      {/* Patrón de ciudad sumergida */}
      <div className="absolute bottom-0 left-0 right-0 h-48 city-pattern opacity-20" />

      {/* Línea de agua superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header de sección */}
        <div className="text-center mb-12">
          <span className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-[0.3em] neon-flicker">
            Escuchanos
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 text-[#c5d1de]">
            Nuestra Música
          </h2>
          <p className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-sm mb-6">
            Disponible en todas las plataformas
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]/50" />
            <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]/50" />
          </div>
        </div>

        {/* EP / Album - Primero */}
        <div ref={musicRef} className="max-w-xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4a9ebb]/20 to-[#7ec8e3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Vinilo móvil - se asoma desde el borde superior de la caja */}
            <div className={`md:hidden absolute left-1/2 w-44 h-44 transition-all duration-700 delay-500 ease-out pointer-events-none ${isMusicVisible ? 'top-0 -translate-x-1/2 -translate-y-1/2 opacity-100 z-0' : 'top-0 -translate-x-1/2 translate-y-[10%] opacity-0 -z-10'}`}>
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(74,158,187,0.4)]">
                <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
                <circle cx="50" cy="50" r="48" fill="url(#vinylShineMobile)" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="26" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="#4a9ebb" />
                <circle cx="50" cy="50" r="14" fill="url(#labelGradientMobile)" />
                <circle cx="50" cy="50" r="3" fill="#0a0c10" />
                <text x="50" y="48" textAnchor="middle" fill="#0a0c10" fontSize="5" fontWeight="bold" fontFamily="sans-serif">OLEAJES</text>
                <text x="50" y="55" textAnchor="middle" fill="#0a0c10" fontSize="3" fontFamily="sans-serif">EP</text>
                <defs>
                  <linearGradient id="vinylShineMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#333" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#111" stopOpacity="0" />
                    <stop offset="100%" stopColor="#333" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="labelGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5fb3d4" />
                    <stop offset="100%" stopColor="#3a8aa8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Vinilo desktop - aparece al lado en hover */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 transition-all duration-500 ease-out translate-x-[0%] group-hover:translate-x-[65%] z-0 pointer-events-none">
              {/* Disco de vinilo */}
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                {/* Base del vinilo */}
                <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
                {/* Brillo sutil */}
                <circle cx="50" cy="50" r="48" fill="url(#vinylShine)" />
                {/* Surcos del vinilo */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="#252525" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#252525" strokeWidth="0.5" />
                {/* Etiqueta central */}
                <circle cx="50" cy="50" r="15" fill="#4a9ebb" />
                <circle cx="50" cy="50" r="14" fill="url(#labelGradient)" />
                {/* Agujero central */}
                <circle cx="50" cy="50" r="3" fill="#0a0c10" />
                {/* Texto en la etiqueta */}
                <text x="50" y="48" textAnchor="middle" fill="#0a0c10" fontSize="4" fontWeight="bold" fontFamily="sans-serif">OLEAJES</text>
                <text x="50" y="54" textAnchor="middle" fill="#0a0c10" fontSize="2.5" fontFamily="sans-serif">EP</text>
                {/* Gradientes */}
                <defs>
                  <linearGradient id="vinylShine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#333" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#111" stopOpacity="0" />
                    <stop offset="100%" stopColor="#333" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="labelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5fb3d4" />
                    <stop offset="100%" stopColor="#3a8aa8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative bg-[#0a0c10]/80 border border-[#2d3d4f]/50 backdrop-blur-sm overflow-hidden z-10">
              {/* Header del EP */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-[#2d3d4f]/30">
                <span className="font-mono text-[#4a9ebb] text-xs px-2 py-1 border border-[#4a9ebb]/50">
                  {album.type}
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-[#c5d1de] text-lg">
                  {album.name}
                </span>
              </div>

              {/* Embed de Spotify para el EP */}
              <div className="wet-photo">
                <iframe
                  src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              {/* Botón para otras plataformas */}
              <button
                onClick={() => setExpandedAlbum(!expandedAlbum)}
                className="w-full px-4 py-2 flex items-center justify-center gap-2 border-t border-[#2d3d4f]/30 transition-colors hover:bg-[#0d1520]/50"
              >
                <span className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-xs uppercase tracking-wider">
                  También en otras plataformas
                </span>
                <svg
                  className={`w-3 h-3 text-[#4a9ebb] transition-transform duration-300 ${
                    expandedAlbum ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Panel desplegable con otras plataformas */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedAlbum ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-2 border-t border-[#2d3d4f]/50">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {otherPlatforms.map((platform) => (
                      <a
                        key={platform.name}
                        href={album.links[platform.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 border border-[#2d3d4f]/50 text-[#c5d1de] font-[family-name:var(--font-space)] text-xs transition-all duration-300 hover:text-[#0a0c10] ${platform.hoverColor} hover:border-transparent hover:shadow-lg`}
                      >
                        <span style={{ color: platform.color }}>{platform.icon}</span>
                        <span>{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canciones - Compactas */}
        <div className="mt-10">
          <h3 className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-xs uppercase tracking-wider mb-4 text-center">
            Singles
          </h3>
          <div className="space-y-2 max-w-md mx-auto">
            {tracks.map((track, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-[#0a0c10]/80 border border-[#2d3d4f]/50 backdrop-blur-sm overflow-hidden">
                  {/* Embed de Spotify compacto */}
                  <div className="wet-photo">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>

                  {/* Botón para otras plataformas */}
                  <button
                    onClick={() => toggleTrack(index)}
                    className="w-full px-3 py-1.5 flex items-center justify-center gap-2 border-t border-[#2d3d4f]/30 transition-colors hover:bg-[#0d1520]/50"
                  >
                    <span className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-[10px] uppercase tracking-wider">
                      Otras plataformas
                    </span>
                    <svg
                      className={`w-3 h-3 text-[#4a9ebb] transition-transform duration-300 ${
                        expandedTrack === index ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Panel desplegable con otras plataformas */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedTrack === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-3 pb-3 pt-1 border-t border-[#2d3d4f]/50">
                      <div className="grid grid-cols-2 gap-1.5">
                        {otherPlatforms.map((platform) => (
                          <a
                            key={platform.name}
                            href={track.links[platform.name]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-2 py-1.5 border border-[#2d3d4f]/50 text-[#c5d1de] font-[family-name:var(--font-space)] text-[10px] transition-all duration-300 hover:text-[#0a0c10] ${platform.hoverColor} hover:border-transparent`}
                          >
                            <span style={{ color: platform.color }}>{platform.icon}</span>
                            <span>{platform.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Iconos de plataformas */}
        <div className="mt-16 text-center">
          <p className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-xs uppercase tracking-wider mb-6">
            Disponible en
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="text-[#7a8a9a] hover:scale-110 transition-transform duration-300"
                style={{ color: platform.color }}
                title={platform.name}
              >
                {platform.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ondas de agua inferiores */}
      <div className="absolute bottom-0 left-0 right-0 h-24 water-ripple" />
    </section>
  );
}
