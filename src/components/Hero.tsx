"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers - ciudad inundada */}
      <div className="absolute inset-0">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center wet-photo opacity-20" />

        {/* Gradiente de profundidad - como agua */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] via-[#0d1520]/80 to-[#1a2634]" />

        {/* Skyline de ciudad */}
        <div className="absolute bottom-0 left-0 right-0 h-64 city-pattern opacity-30" />

        {/* Efecto de lluvia */}
        <div className="absolute inset-0 rain-effect" />

        {/* Líneas horizontales como reflejos en agua */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/20 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/10 to-transparent" />
      </div>

      {/* Ondas de agua en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 water-ripple" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Subtítulo superior */}
        <p className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-6 animate-fade-in-up neon-flicker">
          De la ciudad sumergida
        </p>

        {/* Título principal */}
        <h1 ref={titleRef} className="font-[family-name:var(--font-brush)] text-6xl sm:text-8xl md:text-[12rem] tracking-wide mb-8 italic">
          <span className={`wave-text block drop-shadow-[0_0_30px_rgba(74,158,187,0.3)] text-[#c5d1de] ${isVisible ? 'wave-animate' : ''}`} style={{ textShadow: '4px 4px 0px rgba(74,158,187,0.3), -2px -2px 0px rgba(126,200,227,0.2)' }}>
            Oleajes
            <span className="text-fill" aria-hidden="true">Oleajes</span>
          </span>
        </h1>

        {/* Línea decorativa - como nivel del agua */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="w-20 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]" />
          <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
          <span className="w-20 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]" />
        </div>

        {/* Descripción */}
        <p className="font-[family-name:var(--font-space)] text-xl md:text-2xl text-[#7a8a9a] mb-12 max-w-2xl mx-auto leading-relaxed">
          Rock sin rumbo forcejeando con las olas
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            href="#musica"
            className="group relative px-10 py-4 bg-[#4a9ebb] text-[#0a0c10] font-[family-name:var(--font-space)] font-semibold uppercase tracking-wider text-sm overflow-hidden transition-all duration-300 hover:bg-[#7ec8e3] hover:shadow-[0_0_30px_rgba(74,158,187,0.5)]"
          >
            <span className="relative z-10">Escuchar</span>
          </Link>
          <Link
            href="#tocatas"
            className="group relative px-10 py-4 bg-transparent border-2 border-[#4a9ebb] text-[#4a9ebb] font-[family-name:var(--font-space)] font-semibold uppercase tracking-wider text-sm overflow-hidden transition-all duration-300 hover:bg-[#4a9ebb] hover:text-[#0a0c10] hover:shadow-[0_0_30px_rgba(74,158,187,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2 2 2 0 012 2 2 2 0 01-2 2 2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 002-2V7a2 2 0 00-2-2H5z" />
              </svg>
              Tocatas
            </span>
          </Link>
          <Link
            href="#videos"
            className="group relative px-10 py-4 border border-[#2d3d4f] text-[#c5d1de] font-[family-name:var(--font-space)] font-medium uppercase tracking-wider text-sm overflow-hidden transition-all duration-300 hover:border-[#4a9ebb] hover:text-[#4a9ebb] hover:shadow-[0_0_20px_rgba(74,158,187,0.2)]"
          >
            <span className="relative z-10">Ver Videos</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator - como burbuja subiendo */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-10 border-2 border-[#2d3d4f] rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#4a9ebb] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Esquinas decorativas - como marco de ventana (ocultas en móvil) */}
      <div className="hidden sm:block absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#2d3d4f]/50" />
      <div className="hidden sm:block absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#2d3d4f]/50" />
      <div className="hidden sm:block absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#4a9ebb]/30" />
      <div className="hidden sm:block absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#4a9ebb]/30" />
    </section>
  );
}
