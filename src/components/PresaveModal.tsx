"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SPOTIFY_URL = "https://open.spotify.com/intl-es/track/16rBW4d1nbt7CddJWaUDXO?si=caceb3f59ad742cf";
const STORAGE_KEY = "oleajes-listen-dismissed";

export default function PresaveModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsClosing(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Escucha Ya no doy más"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0a0c10]/80 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div
        className={`relative max-w-md w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#0d1520] to-[#1a2634] border border-[#2d3d4f] rounded-xl p-6 sm:p-10 text-center shadow-[0_0_60px_rgba(74,158,187,0.25)] transition-transform duration-300 ${
          isClosing ? "scale-95" : "scale-100 animate-fade-in-up"
        }`}
      >
        {/* Líneas decorativas de agua */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/20 to-transparent" />

        {/* Botón cerrar */}
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-[#7a8a9a] hover:text-[#c5d1de] transition-colors duration-200"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {/* Contenido */}
        <p className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-[0.3em] mb-5">
          Ya disponible
        </p>

        {/* Portada */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 rounded-lg overflow-hidden border border-[#2d3d4f] shadow-[0_0_40px_rgba(74,158,187,0.2)]">
          <Image
            src="/images/ya-no-doy-mas.jpg"
            alt="Portada de Ya no doy más"
            fill
            sizes="(max-width: 640px) 192px, 224px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="font-[family-name:var(--font-brush)] text-4xl sm:text-5xl italic text-[#c5d1de] mb-5 drop-shadow-[0_0_20px_rgba(74,158,187,0.3)]">
          Ya no doy más
        </h2>

        {/* Línea decorativa */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]" />
          <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
          <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]" />
        </div>

        <p className="font-[family-name:var(--font-space)] text-[#7a8a9a] mb-7 leading-relaxed">
          Nuestro nuevo single ya está afuera. Escúchalo ahora.
        </p>

        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="inline-block w-full px-10 py-4 bg-[#a8d8ea] text-[#0a0c10] font-[family-name:var(--font-space)] font-semibold uppercase tracking-wider text-sm rounded-lg transition-all duration-300 hover:bg-[#c5e8f2] hover:shadow-[0_0_30px_rgba(74,158,187,0.4)]"
        >
          Escuchar en Spotify
        </a>

        <button
          onClick={close}
          className="mt-4 font-[family-name:var(--font-space)] text-xs text-[#7a8a9a] hover:text-[#c5d1de] uppercase tracking-wider transition-colors duration-200"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}
