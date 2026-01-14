import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Shows from "@/components/Shows";
import Videos from "@/components/Videos";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Music />
        <Shows />
        <Videos />
        <About />
      </main>
      <Footer />
    </>
  );
}
