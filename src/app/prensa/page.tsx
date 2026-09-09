import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import styles from "./prensa.module.css";

export const metadata: Metadata = {
  title: "Prensa | Oleajes — Es así",
  description:
    "Kit de prensa de Oleajes: dossier, biografía, comunicado de Es así, fotografías, portada y logo para descargar.",
  alternates: { canonical: "https://oleajes-banda.vercel.app/prensa" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Prensa | Oleajes — Es así",
    description: "Material de prensa y descargas del álbum debut de Oleajes.",
    type: "website",
    url: "https://oleajes-banda.vercel.app/prensa",
  },
};

const documents = [
  { name: "Dossier de prensa", file: "oleajes-dossier-2026.pdf", detail: "PDF · 10 MB" },
  { name: "Biografía", file: "oleajes-biografia.pdf", detail: "PDF · 67 KB" },
  { name: "Comunicado de Es así", file: "oleajes-es-asi-comunicado.docx", detail: "Word · 12,1 MB" },
  { name: "Enlaces y créditos", file: "oleajes-enlaces-y-creditos.txt", detail: "Texto · 1 KB" },
];

const photos = [
  { file: "oleajes-foto-01.jpg", label: "Fotografía 01" },
  { file: "oleajes-foto-02.jpg", label: "Fotografía 02" },
  { file: "oleajes-foto-03.jpg", label: "Fotografía 03" },
  { file: "oleajes-foto-04.jpg", label: "Fotografía 04" },
  { file: "oleajes-foto-05.jpg", label: "Fotografía 05" },
  { file: "oleajes-foto-06.jpg", label: "Fotografía 06" },
  { file: "oleajes-foto-07.jpg", label: "Fotografía 07" },
  { file: "oleajes-foto-08.jpg", label: "Fotografía 08" },
  { file: "oleajes-foto-09.jpg", label: "Fotografía 09" },
];

export default function PressPage() {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <main className={styles.page} id="prensa">
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Oleajes · Santiago de Chile</p>
            <h1>Kit de prensa</h1>
            <p className={styles.intro}>
              <strong>Es así</strong>, el álbum debut de Oleajes.
              Diez canciones de rock alternativo e indie rock en español,
              disponibles desde el 3 de septiembre de 2026.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="/prensa/oleajes-es-asi-kit-prensa.zip" download>
                Descargar kit completo <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.secondary} href="https://open.spotify.com/album/5d63rjV9bWDZtUpRYIfCLk" target="_blank" rel="noopener noreferrer">
                Escuchar Es así <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className={styles.note}>ZIP · 57 MB · Documentos, 9 fotografías, portada y logo</p>
            <p className={styles.contact}>
              Prensa y entrevistas<br />
              <a href="mailto:oleajesbanda@gmail.com">oleajesbanda@gmail.com</a>
            </p>
          </div>
          <figure className={styles.cover}>
            <Image src="/prensa/oleajes-es-asi-portada.png" alt="Portada de Es así, álbum debut de Oleajes" width={2999} height={2999} sizes="(max-width: 767px) 90vw, 360px" priority />
            <figcaption>Es así · Álbum debut · 2026</figcaption>
          </figure>
        </header>

        <section className={styles.section} aria-labelledby="documentos">
          <div className={styles.sectionHeading}>
            <h2 id="documentos">Documentos</h2>
            <p>Descargas individuales</p>
          </div>
          <div className={styles.documents}>
            {documents.map((document) => (
              <a className={styles.document} key={document.file} href={`/prensa/${document.file}`} download>
                <span><strong>{document.name}</strong><small>{document.detail}</small></span>
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="fotografias">
          <div className={styles.sectionHeading}>
            <h2 id="fotografias">Fotografías de prensa</h2>
            <p>Crédito: @valepuaj · JPG · 2048 × 1365 px</p>
          </div>
          <div className={styles.photos}>
            {photos.map((photo) => (
              <a className={styles.photo} key={photo.file} href={`/prensa/${photo.file}`} download aria-label={`Descargar ${photo.label.toLowerCase()} de Oleajes`}>
                <Image src={`/prensa/${photo.file}`} alt={`${photo.label} de la banda Oleajes`} width={2048} height={1365} sizes="(max-width: 767px) 90vw, 33vw" />
                <span>{photo.label}<span aria-hidden="true">↓</span></span>
              </a>
            ))}
          </div>
          <p className={styles.note}>Al publicar las fotografías, incluir el crédito de la fotógrafa.</p>
        </section>

        <section className={styles.section} aria-labelledby="arte">
          <div className={styles.sectionHeading}><h2 id="arte">Portada y logo</h2></div>
          <div className={styles.artwork}>
            <a className={styles.artworkItem} href="/prensa/oleajes-es-asi-portada.png" download>
              <Image src="/prensa/oleajes-es-asi-portada.png" alt="Portada del álbum Es así" width={2999} height={2999} sizes="120px" />
              <span><strong>Portada de Es así</strong><small>PNG · 2999 × 2999 px · 14,2 MB</small><small>Arte: Valeria Pozo Farías</small></span>
              <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.artworkItem} href="/prensa/oleajes-logo.png" download>
              <Image src="/prensa/oleajes-logo.png" alt="Logo de Oleajes" width={3300} height={3300} sizes="120px" />
              <span><strong>Logo de Oleajes</strong><small>PNG · 3300 × 3300 px · 3 MB</small></span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.about}`} aria-labelledby="banda">
          <div>
            <h2 id="banda">Sobre Oleajes</h2>
            <p>
              Oleajes es una banda de Santiago de Chile que cruza rock alternativo,
              indie y sonidos de los noventa. Su primer álbum, <em>Es así</em>,
              reúne diez canciones y fue grabado en Estudio Pirámide, con
              producción y mezcla de Luciano Echeverría y masterización de Arturo Zegers.
            </p>
          </div>
          <div className={styles.links}>
            <h3>Enlaces oficiales</h3>
            <Link href="/#musica">Es así en todas las plataformas ↗</Link>
            <a href="https://instagram.com/oleajes.banda" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://www.youtube.com/@OleajesBanda" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a href="mailto:oleajesbanda@gmail.com">Contacto de prensa ↗</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
