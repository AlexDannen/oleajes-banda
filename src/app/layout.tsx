import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display, Satisfy } from "next/font/google";
import "./globals.css";

// Fuente moderna con personalidad para texto general
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

// Fuente elegante con aire vintage para títulos
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Fuente brush script estilo afiche vintage
const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brush",
});

export const metadata: Metadata = {
  title: "Oleajes | Banda de Rock",
  description: "Oleajes - Banda de rock. Escucha nuestra música, mira nuestros videos y conoce más sobre nosotros.",
  keywords: ["oleajes", "banda", "rock", "música", "argentina"],
  openGraph: {
    title: "Oleajes | Banda de Rock",
    description: "Escucha nuestra música y mira nuestros videos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${playfair.variable} ${satisfy.variable} font-sans antialiased bg-[#0d0d0d] text-[#e8e4df]`}>
        {children}
      </body>
    </html>
  );
}
