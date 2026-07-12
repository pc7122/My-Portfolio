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
      <div className="content-visibility-auto">
        <Experience />
      </div>
      <div className="content-visibility-auto">
        <Work />
      </div>
      <div className="content-visibility-auto">
        <Skills />
      </div>
      <div className="content-visibility-auto">
        <Mobile />
      </div>
      <div className="content-visibility-auto">
        <Photography />
      </div>
      <div className="content-visibility-auto">
        <Contact />
      </div>
      {/* AI Prathamesh OS — Hidden Terminal Experience */}
      <TerminalOverlay />
    </main>
  );
}
