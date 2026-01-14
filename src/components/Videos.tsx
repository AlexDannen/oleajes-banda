export default function Videos() {
  const videos = [
    {
      id: "KdTmCP8xhWE",
      title: "Sesión en vivo 1",
      subtitle: "Oleajes",
    },
    {
      id: "IloJITOSWe0",
      title: "Sesión en vivo 2",
      subtitle: "Oleajes",
    },
  ];

  const youtubeChannelUrl = "https://youtube.com/@oleajes";

  return (
    <section id="videos" className="relative py-32 px-4 bg-[#0a0c10] overflow-hidden">
      {/* Efecto de lluvia sutil */}
      <div className="absolute inset-0 rain-effect opacity-30" />

      {/* Scanlines como TV vieja */}
      <div className="absolute inset-0 scanlines" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-[0.3em] neon-flicker">
            Miranos
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold mt-4 mb-6 text-[#c5d1de]">
            Videos
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]/50" />
            <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]/50" />
          </div>
        </div>

        {/* Grid de videos - 2 columnas centradas */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group relative"
            >
              {/* Edificios que aparecen arriba */}
              <div className="absolute bottom-full left-0 w-full h-32 mb-[-12px] transition-all duration-500 ease-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                  {/* Edificio 1 - izquierda */}
                  <rect x="10" y="20" width="20" height="30" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="13" y="24" width="4" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="20" y="24" width="4" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="13" y="31" width="4" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="20" y="31" width="4" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="13" y="38" width="4" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="20" y="38" width="4" height="4" fill="#4a9ebb" opacity="0.5" />

                  {/* Edificio 2 - torre alta */}
                  <rect x="35" y="5" width="18" height="45" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="38" y="10" width="3" height="3" fill="#4a9ebb" opacity="0.6" />
                  <rect x="44" y="10" width="3" height="3" fill="#4a9ebb" opacity="0.4" />
                  <rect x="38" y="16" width="3" height="3" fill="#4a9ebb" opacity="0.3" />
                  <rect x="44" y="16" width="3" height="3" fill="#4a9ebb" opacity="0.7" />
                  <rect x="38" y="22" width="3" height="3" fill="#4a9ebb" opacity="0.5" />
                  <rect x="44" y="22" width="3" height="3" fill="#4a9ebb" opacity="0.4" />
                  <rect x="38" y="28" width="3" height="3" fill="#4a9ebb" opacity="0.6" />
                  <rect x="44" y="28" width="3" height="3" fill="#4a9ebb" opacity="0.3" />
                  <rect x="38" y="34" width="3" height="3" fill="#4a9ebb" opacity="0.4" />
                  <rect x="44" y="34" width="3" height="3" fill="#4a9ebb" opacity="0.5" />
                  <rect x="38" y="40" width="3" height="3" fill="#4a9ebb" opacity="0.7" />
                  <rect x="44" y="40" width="3" height="3" fill="#4a9ebb" opacity="0.3" />
                  {/* Antena */}
                  <line x1="44" y1="5" x2="44" y2="0" stroke="#4a9ebb" strokeWidth="0.5" />
                  <circle cx="44" cy="0" r="1" fill="#FF0000" opacity="0.8" />

                  {/* Edificio 3 - medio */}
                  <rect x="58" y="15" width="25" height="35" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="62" y="19" width="4" height="5" fill="#4a9ebb" opacity="0.4" />
                  <rect x="69" y="19" width="4" height="5" fill="#4a9ebb" opacity="0.6" />
                  <rect x="76" y="19" width="4" height="5" fill="#4a9ebb" opacity="0.3" />
                  <rect x="62" y="27" width="4" height="5" fill="#4a9ebb" opacity="0.5" />
                  <rect x="69" y="27" width="4" height="5" fill="#4a9ebb" opacity="0.3" />
                  <rect x="76" y="27" width="4" height="5" fill="#4a9ebb" opacity="0.7" />
                  <rect x="62" y="35" width="4" height="5" fill="#4a9ebb" opacity="0.3" />
                  <rect x="69" y="35" width="4" height="5" fill="#4a9ebb" opacity="0.5" />
                  <rect x="76" y="35" width="4" height="5" fill="#4a9ebb" opacity="0.4" />

                  {/* Edificio 4 - bajo ancho */}
                  <rect x="88" y="30" width="30" height="20" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="92" y="34" width="5" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="100" y="34" width="5" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="108" y="34" width="5" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="92" y="41" width="5" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="100" y="41" width="5" height="4" fill="#4a9ebb" opacity="0.7" />
                  <rect x="108" y="41" width="5" height="4" fill="#4a9ebb" opacity="0.4" />

                  {/* Edificio 5 - torre derecha */}
                  <rect x="123" y="10" width="15" height="40" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="126" y="14" width="3" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="131" y="14" width="3" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="126" y="21" width="3" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="131" y="21" width="3" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="126" y="28" width="3" height="4" fill="#4a9ebb" opacity="0.7" />
                  <rect x="131" y="28" width="3" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="126" y="35" width="3" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="131" y="35" width="3" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="126" y="42" width="3" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="131" y="42" width="3" height="4" fill="#4a9ebb" opacity="0.4" />

                  {/* Edificio 6 - pequeño derecha */}
                  <rect x="143" y="25" width="18" height="25" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="146" y="29" width="4" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="153" y="29" width="4" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="146" y="36" width="4" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="153" y="36" width="4" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="146" y="43" width="4" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="153" y="43" width="4" height="4" fill="#4a9ebb" opacity="0.5" />

                  {/* Edificio 7 - extremo derecha */}
                  <rect x="166" y="20" width="24" height="30" fill="#1a2634" stroke="#4a9ebb" strokeWidth="0.5" />
                  <rect x="170" y="24" width="5" height="4" fill="#4a9ebb" opacity="0.4" />
                  <rect x="178" y="24" width="5" height="4" fill="#4a9ebb" opacity="0.6" />
                  <rect x="170" y="31" width="5" height="4" fill="#4a9ebb" opacity="0.7" />
                  <rect x="178" y="31" width="5" height="4" fill="#4a9ebb" opacity="0.3" />
                  <rect x="170" y="38" width="5" height="4" fill="#4a9ebb" opacity="0.5" />
                  <rect x="178" y="38" width="5" height="4" fill="#4a9ebb" opacity="0.4" />
                  {/* Antena */}
                  <line x1="178" y1="20" x2="178" y2="14" stroke="#4a9ebb" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Marco estilo pantalla/monitor viejo */}
              <div className="relative bg-[#1a2634] p-4 border border-[#2d3d4f] transition-all duration-500 hover:border-[#4a9ebb]/50 hover:shadow-[0_0_40px_rgba(74,158,187,0.2)] z-10">
                {/* Indicador de "grabando" */}
                <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-red-500 font-mono uppercase">Rec</span>
                </div>

                {/* Video */}
                <div className="aspect-video bg-[#0a0c10] overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Info del video - estilo terminal */}
                <div className="mt-4 pt-4 border-t border-[#2d3d4f]">
                  <p className="text-[#c5d1de] font-[family-name:var(--font-space)] text-sm uppercase tracking-wider">
                    {video.title}
                  </p>
                  <p className="text-[#4a9ebb] text-xs font-mono mt-1">
                    // {video.subtitle}
                  </p>
                </div>

                {/* Efecto de reflejo en agua debajo */}
                <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-b from-[#4a9ebb]/10 to-transparent blur-sm transform scale-y-[-1] opacity-50" />
              </div>
            </div>
          ))}
        </div>

        {/* Link a YouTube */}
        <div className="text-center mt-16">
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#FF0000]/50 text-[#FF0000] font-[family-name:var(--font-space)] uppercase tracking-wider text-sm transition-all duration-300 hover:bg-[#FF0000] hover:text-[#c5d1de] hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Suscribite en YouTube
          </a>
        </div>
      </div>

      {/* Línea de agua inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/30 to-transparent" />
    </section>
  );
}
