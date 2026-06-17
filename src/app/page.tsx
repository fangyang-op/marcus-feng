import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { MetricsBar } from "@/components/MetricsBar";
import { Projects } from "@/components/Projects";
import { Knowledge } from "@/components/Knowledge";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <MetricsBar />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Knowledge />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Timeline />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
