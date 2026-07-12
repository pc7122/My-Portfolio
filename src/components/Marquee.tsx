import { Reveal } from "./Reveal";

const logos = [
  "React Native", "TypeScript", "JavaScript", "Python", "React",
  "Tailwind CSS", "Firebase", "PostgreSQL", "SQL", "Git",
  "Postman", "Jest", "FastAPI", "TensorFlow",
];

export const Marquee = () => {
  return (
    <section className="py-12 border-y border-border/50 overflow-hidden">
      <Reveal className="container-wide mb-6">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          The stack I ship with
        </p>
      </Reveal>
      <div className="relative">
        <div className="flex marquee gap-12 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-2xl font-display font-semibold text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
