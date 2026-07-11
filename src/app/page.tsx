import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Mobile } from "@/components/Mobile";
import { Photography } from "@/components/Photography";
import { Contact } from "@/components/Contact";
import { TerminalOverlay } from "@/components/terminal/TerminalOverlay";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Mobile />
      <Photography />
      <Contact />
      {/* AI Prathamesh OS — Hidden Terminal Experience */}
      <TerminalOverlay />
    </main>
  );
}
