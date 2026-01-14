"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Shows() {
  const [isUpcomingVisible, setIsUpcomingVisible] = useState(false);
  const upcomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsUpcomingVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (upcomingRef.current) {
      observer.observe(upcomingRef.current);
    }

    return () => observer.disconnect();
  }, []);
  // Próximas tocatas
  const upcomingShows = [
    {
      posterImage: "/images/shows/afiche-tocata.jpg",
      ticketUrl: "#",
      title: "La Juguera - 22 Agosto",
    },
  ];

  // Tocatas pasadas (afiches para la pared)
  const pastShows = [
    {
      posterImage: "/images/shows/afiche-tocata.jpg",
      title: "La Juguera - 22 Agosto 2024",
      rotation: "-3deg",
      top: "10%",
      left: "8%",
      leftMd: "15%",
    },
    {
      posterImage: "/images/shows/halloween-volantin.jpg",
      title: "Halloween Volantín - 31 Oct 2024",
      rotation: "2deg",
      top: "12%",
      left: "52%",
      leftMd: "55%",
    },
  ];

  return (
    <section id="tocatas" className="relative py-20 px-4 bg-[#0a0c10] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-[0.3em] neon-flicker">
          En Vivo
        </span>
        <h2 className="font-[family-name:var(--font-brush)] text-5xl sm:text-6xl md:text-8xl text-[#c5d1de] mt-4 mb-6 italic">
          Tocatas
        </h2>
        <div className="flex items-center justify-center gap-4">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]/50" />
          <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]/50" />
        </div>
      </div>

      {/* PRÓXIMOS EVENTOS */}
      <div ref={upcomingRef} className="max-w-4xl mx-auto mb-20">
        <h3 className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-sm uppercase tracking-[0.2em] mb-8 text-center">
          ⚡ Próximos Eventos
        </h3>

        <div className="flex flex-wrap justify-center gap-8">
          {upcomingShows.map((show, index) => (
            <a
              key={index}
              href={show.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <div className="relative w-64 md:w-80 bg-[#1a2634] p-3 border border-[#4a9ebb]/50 shadow-[0_0_30px_rgba(74,158,187,0.2)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(74,158,187,0.4)] group-hover:border-[#4a9ebb]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={show.posterImage}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 256px, 320px"
                  />

                  {/* Siluetas de público - aparecen al scrollear a la sección con delay */}
                  <div className={`absolute bottom-0 left-0 right-0 h-32 transition-transform duration-700 delay-500 ease-out pointer-events-none ${isUpcomingVisible ? 'translate-y-[25%]' : 'translate-y-full'}`}>
                    <Image
                      src="/images/crowd-silhouette.png"
                      alt="Público"
                      fill
                      className="object-cover object-top"
                      sizes="320px"
                    />
                  </div>
                </div>
                {/* Glowing border effect */}
                <div className="absolute inset-0 border border-[#4a9ebb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Label */}
              <div className="mt-4 text-center">
                <span className="inline-block bg-[#4a9ebb] text-[#0a0c10] px-6 py-2 font-[family-name:var(--font-space)] font-bold uppercase tracking-wider text-xs">
                  🎟️ Conseguir Entradas
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* PARED CON AFICHES PASADOS */}
      <div className="max-w-6xl mx-auto">
        <h3 className="font-[family-name:var(--font-space)] text-[#7a8a9a] text-sm uppercase tracking-[0.2em] mb-8 text-center">
          📌 Tocatas Pasadas
        </h3>

        {/* La pared */}
        <div
          className="relative min-h-[350px] sm:min-h-[450px] md:min-h-[600px] rounded-sm overflow-hidden border border-[#2d3d4f]"
          style={{
            background: 'linear-gradient(180deg, #1e2a38 0%, #1a2634 30%, #151d28 70%, #0d1520 100%)',
          }}
        >
          {/* Capa base de textura de pared con iluminación difusa */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wall'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%231a2634' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wall)'/%3E%3C/svg%3E")`,
              backgroundSize: '500px 500px',
            }}
          />

          {/* Capa de ruido fino para textura de pintura vieja */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
              filter: 'contrast(150%) brightness(100%)',
            }}
          />

          {/* Manchas de humedad oscuras (filtraciones) */}
          <div className="absolute top-0 left-[15%] w-48 h-[45%] bg-gradient-to-b from-[#0a0c10]/70 via-[#0a0c10]/40 to-transparent rounded-b-full blur-sm" />
          <div className="absolute top-0 right-[25%] w-32 h-[60%] bg-gradient-to-b from-[#0a0c10]/50 via-[#0a0c10]/30 to-transparent rounded-b-full blur-md" />
          <div className="absolute top-0 left-[55%] w-24 h-[35%] bg-gradient-to-b from-[#0a0c10]/60 via-[#0d1520]/40 to-transparent rounded-b-full" />

          {/* Manchas de humedad más claras */}
          <div className="absolute top-[20%] left-[5%] w-64 h-80 bg-[#2d3d4f]/15 rounded-full blur-3xl" />
          <div className="absolute top-[50%] right-[8%] w-48 h-64 bg-[#1a2634]/25 rounded-full blur-2xl" />
          <div className="absolute bottom-[10%] left-[35%] w-72 h-40 bg-[#2d3d4f]/10 rounded-full blur-3xl" />



          {/* Grietas en la pared */}
          <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
            {/* Grieta principal izquierda */}
            <path d="M 12% 0% L 13% 15% L 11% 30% L 14% 45% L 12% 60% L 15% 75% L 13% 100%"
                  stroke="#0a0c10" strokeWidth="2" fill="none" />
            <path d="M 12% 0% L 13% 15% L 11% 30% L 14% 45% L 12% 60% L 15% 75% L 13% 100%"
                  stroke="#2d3d4f" strokeWidth="0.5" fill="none" strokeDasharray="4 8" />

            {/* Ramificación */}
            <path d="M 13% 15% Q 18% 20%, 20% 18%" stroke="#0a0c10" strokeWidth="1" fill="none" />
            <path d="M 14% 45% Q 10% 55%, 8% 52%" stroke="#0a0c10" strokeWidth="0.8" fill="none" />

            {/* Grieta derecha */}
            <path d="M 82% 0% Q 80% 25%, 85% 50% T 78% 100%" stroke="#0a0c10" strokeWidth="1.5" fill="none" />

            {/* Grietas pequeñas */}
            <path d="M 45% 30% L 48% 45% L 44% 60%" stroke="#0a0c10" strokeWidth="0.8" fill="none" />
            <path d="M 65% 70% Q 68% 85%, 63% 100%" stroke="#0a0c10" strokeWidth="0.6" fill="none" />
          </svg>


          {/* Restos de cinta adhesiva vieja */}
          <div className="absolute top-[8%] right-[9%] w-10 h-3 bg-[#2d3d4f]/60 rotate-[-8deg] shadow-sm" />
          <div className="absolute top-[42%] right-[6%] w-6 h-2 bg-[#2d3d4f]/50 rotate-[12deg]" />
          <div className="absolute bottom-[15%] left-[9%] w-8 h-2 bg-[#2d3d4f]/45 rotate-[-5deg]" />

          {/* Suciedad acumulada en esquinas */}
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#0a0c10]/50 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0a0c10]/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-72 h-48 bg-[#0a0c10]/60 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-80 h-56 bg-[#0a0c10]/50 rounded-full blur-3xl" />

          {/* Línea de suciedad en la base (como un zócalo sucio) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0c10]/90 via-[#0a0c10]/50 to-transparent" />

          {/* Viñeta atmosférica */}
          <div className="absolute inset-0" style={{
            boxShadow: 'inset 0 0 200px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,0,0,0.4), inset 0 50px 100px rgba(0,0,0,0.3)',
          }} />

          {/* Afiches pegados */}
          {pastShows.map((show, index) => (
            <div
              key={index}
              className="absolute w-24 sm:w-32 md:w-44 group cursor-pointer"
              style={{
                top: show.top,
                left: show.left,
                transform: `rotate(${show.rotation})`,
              }}
            >
              {/* Cinta adhesiva arriba */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 z-10 rotate-[-1deg]"
                style={{
                  background: 'linear-gradient(180deg, rgba(74,158,187,0.6) 0%, rgba(74,158,187,0.4) 100%)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.5), 0 0 8px rgba(74,158,187,0.3)',
                  backdropFilter: 'blur(2px)',
                }}
              />

              {/* El afiche */}
              <div
                className="relative bg-[#1a2634] p-1 shadow-[4px_4px_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 group-hover:z-20 group-hover:shadow-[0_0_30px_rgba(74,158,187,0.3)]"
                style={{
                  filter: 'saturate(0.9) brightness(0.95)',
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={show.posterImage}
                    alt={show.title}
                    fill
                    className="object-cover"
                    sizes="176px"
                  />

                  {/* Efecto de desgaste sobre el afiche */}
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Bordes desgastados */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
                </div>
              </div>

              {/* Segunda cinta abajo (algunos afiches) */}
              {index % 2 === 0 && (
                <div className="absolute -bottom-1 right-3 w-12 h-3 z-10 rotate-[3deg]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(74,158,187,0.5) 0%, rgba(74,158,187,0.3) 100%)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.5), 0 0 6px rgba(74,158,187,0.2)',
                    backdropFilter: 'blur(2px)',
                  }}
                />
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
