"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#musica", label: "Música" },
    { href: "#tocatas", label: "Tocatas" },
    { href: "#videos", label: "Videos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0c10]/95 backdrop-blur-sm border-b border-[#4a9ebb]/20 shadow-[0_4px_30px_rgba(74,158,187,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="#inicio"
            className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-wide text-[#c5d1de] glitch-hover"
          >
            Rock Chileno
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[#7a8a9a] hover:text-[#c5d1de] transition-colors duration-200 text-sm uppercase tracking-widest font-[family-name:var(--font-space)] group ${
                  link.href === "#tocatas" ? "text-[#4a9ebb]" : ""
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4a9ebb] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(74,158,187,0.5)]" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 relative z-50"
            aria-label="Toggle menu"
          >
            <div className="w-7 h-6 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-[#c5d1de] transition-all duration-300 origin-left ${
                  isOpen ? "rotate-45 translate-x-px bg-[#4a9ebb]" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#c5d1de] transition-all duration-300 ${
                  isOpen ? "opacity-0 translate-x-3" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#c5d1de] transition-all duration-300 origin-left ${
                  isOpen ? "-rotate-45 translate-x-px bg-[#4a9ebb]" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-[#0a0c10]/98 transition-all duration-500 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Rain effect in mobile menu */}
          <div className="absolute inset-0 rain-effect opacity-50" />

          <div className="relative flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-[family-name:var(--font-playfair)] tracking-wide transition-colors ${
                  link.href === "#tocatas"
                    ? "text-[#4a9ebb] hover:text-[#7ec8e3]"
                    : "text-[#c5d1de] hover:text-[#4a9ebb]"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
