import { Reveal } from "./Reveal";
import { ArrowUpRight, Mail } from "lucide-react";
import { FiGithub as Github, FiInstagram as Instagram, FiLinkedin as Linkedin } from "react-icons/fi";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-aurora opacity-60 pointer-events-none" />
      <div className="container-wide relative">
        <Reveal>
          <div className="glass-strong rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-pulse-glow" />

            <div className="relative">
              <p className="text-sm font-mono text-primary tracking-widest uppercase mb-6">Let's build together</p>
              <h2 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[0.95] mb-6">
                Have a product
                <br />
                <span className="text-gradient-primary">that needs shipping?</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                I'm currently taking on freelance and full-time opportunities in mobile, backend and applied ML. Let's talk.
              </p>

              <a
                href="mailto:prathameshchaudhary7122@gmail.com"
                className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:-translate-y-0.5 transition-all text-xs xs:text-sm sm:text-base md:text-lg max-w-full"
              >
                <span className="truncate max-w-[220px] xs:max-w-none">prathameshchaudhary7122@gmail.com</span>
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform shrink-0" />
              </a>

              <div className="flex justify-center gap-3 mt-10">
                {[
                  { icon: Github, href: "https://github.com/pc7122" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Instagram, href: "https://instagram.com" },
                  { icon: Mail, href: "mailto:prathameshchaudhary7122@gmail.com" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-xl glass grid place-items-center hover:bg-primary hover:text-primary-foreground transition-all hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="font-mono">© 2026 Prathamesh Chaudhary. Crafted in Pune.</div>
          <div className="font-mono">Built with React + Tailwind</div>
        </footer>
      </div>
    </section>
  );
};
