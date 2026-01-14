import Image from "next/image";

export default function About() {
  const members = [
    {
      name: "Alex Dannenberg",
      role: "Voz / Guitarra",
      image: "/images/band/alex.jpg",
    },
    {
      name: "Sebastian Morales",
      role: "Guitarra",
      image: "/images/band/sebastian.jpg",
    },
    {
      name: "Alejandro Petrulis",
      role: "Bajo",
      image: "/images/band/alejandro.jpg",
    },
    {
      name: "Vicente Breton",
      role: "Batería",
      image: "/images/band/vicente.jpg",
    },
  ];

  return (
    <section id="nosotros" className="relative py-32 px-4 bg-[#0d1520] overflow-hidden">
      {/* Fondo de ciudad */}
      <div className="absolute inset-0 city-pattern opacity-10" />

      {/* Efecto de agua */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#4a9ebb]/5 to-transparent" />

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a9ebb]/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-[0.3em] neon-flicker">
            Conocenos
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold mt-4 mb-6 text-[#c5d1de]">
            Sobre Nosotros
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#4a9ebb]/50" />
            <span className="w-2 h-2 bg-[#4a9ebb] animate-pulse" />
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#4a9ebb]/50" />
          </div>
        </div>

        {/* Historia - estilo terminal/pantalla */}
        <div className="relative max-w-3xl mx-auto mb-24">
          <div className="relative bg-[#0a0c10]/90 border border-[#2d3d4f] p-8 md:p-12 backdrop-blur-sm">
            {/* Barra de título estilo ventana */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a2634] border-b border-[#2d3d4f] flex items-center px-4 gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
              <span className="ml-4 text-[10px] text-[#7a8a9a] font-mono">oleajes_manifiesto.txt</span>
            </div>

            <div className="pt-8">
              <p className="font-[family-name:var(--font-space)] text-[#c5d1de] text-lg md:text-xl leading-relaxed">
                <span className="text-[#4a9ebb]">&gt;</span> Si estás aquí es porque te interesaste en nuestra música y nos escuchaste.
                <br /><br />
                <span className="text-[#4a9ebb]">&gt;</span> Solo por eso, gracias.
              </p>

              <div className="mt-8 pt-6 border-t border-[#2d3d4f]">
                <p className="font-mono text-[#4a9ebb] text-sm">
                  <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrantes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="group text-center"
            >
              {/* Foto con efecto de pantalla */}
              <div className="relative mx-auto mb-6">
                <div className="relative bg-[#1a2634] p-2 border border-[#2d3d4f] transition-all duration-500 group-hover:border-[#4a9ebb]/50 group-hover:shadow-[0_0_30px_rgba(74,158,187,0.2)]">
                  <div className="aspect-square bg-[#0a0c10] overflow-hidden relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover wet-photo"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Scanlines sobre la foto */}
                    <div className="absolute inset-0 scanlines opacity-30" />
                  </div>

                  {/* Indicador */}
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#4a9ebb] animate-pulse" />
                </div>

                {/* Reflejo */}
                <div className="absolute -bottom-4 left-2 right-2 h-4 bg-gradient-to-b from-[#4a9ebb]/10 to-transparent blur-sm" />
              </div>

              {/* Info */}
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#c5d1de] mb-1">
                {member.name}
              </h3>
              <p className="font-[family-name:var(--font-space)] text-[#4a9ebb] text-xs uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ondas de agua */}
      <div className="absolute bottom-0 left-0 right-0 h-20 water-ripple" />
    </section>
  );
}
