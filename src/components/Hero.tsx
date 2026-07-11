import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import heroOrbs from "@/assets/hero-orbs.jpg";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-aurora opacity-90"
        aria-hidden
      />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for new opportunities
            </div>

            <div className="space-y-4">
              <p className="text-sm font-mono text-primary tracking-widest uppercase">
                Prathamesh Chaudhary — AI/ML & Mobile Engineer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[0.95] tracking-tight">
                Building intelligent
                <br />
                <span className="text-gradient-primary">
                  products that ship.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                I design and build production-grade systems across{" "}
                <span className="text-foreground">AI/ML</span>,{" "}
                <span className="text-foreground">
                  React Native mobile apps
                </span>
                , and{" "}
                <span className="text-foreground">
                  IoT-powered smart vending
                </span>{" "}
                — turning raw hardware signals into delightful user experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:-translate-y-0.5 transition-all"
              >
                View my work
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/Prathamesh_Chaudhary.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-secondary transition-all font-medium"
              >
                <Download size={18} />
                Get my resume
              </a>
              <a
                href="https://github.com/pc7122"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass hover:bg-secondary transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            <div className="flex flex-wrap gap-8 pt-4 border-t border-border/50">
              {[
                { n: "2+", l: "Years building" },
                { n: "7+", l: "Shipped projects" },
                { n: "8+", l: "Tech stacks" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-display font-bold text-gradient">
                    {s.n}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-mesh opacity-30 blur-3xl animate-spin-slow" />
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden glass shadow-elegant animate-float-slow">
                <Image
                  src={heroOrbs}
                  alt="Abstract tech visual"
                  width={1536}
                  height={1536}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl p-4 shadow-card animate-fade-in">
                <div className="text-xs font-mono text-muted-foreground">
                  Currently building
                </div>
                <div className="text-sm font-semibold">Smart Vending OS</div>
              </div>
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-card animate-fade-in">
                <div className="text-xs font-mono text-primary">
                  React Native + IoT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
