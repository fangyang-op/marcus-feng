import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { Projects } from "@/components/Projects";
import { Knowledge } from "@/components/Knowledge";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MetricsBar />
        <Projects />
        <Knowledge />
        <Skills />
        <Timeline />
      </main>
      <Footer />
    </>
  );
}
