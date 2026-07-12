import { Reveal } from "./Reveal";

const skillGroups = [
  {
    title: "Languages & Databases",
    items: [
      { name: "Python", level: 80 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "React / Next.js", level: 90 },
      { name: "React Native", level: 88 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 78 },
      { name: "OpenCV / YOLO", level: 82 },
      { name: "Pandas / NumPy", level: 90 },
    ],
  },
  {
    title: "Backend & IoT",
    items: [
      { name: "Django / FastAPI", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MQTT / WebSockets", level: 78 },
      { name: "Raspberry Pi / Arduino", level: 75 },
    ],
  },
  {
    title: "Software & Tools",
    items: [
      { name: "Postman", level: 85 },
      { name: "Git", level: 88 },
      { name: "Firebase", level: 80 },
      { name: "Claude Code", level: 85 },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Jest", level: 82 },
      { name: "Mocha", level: 78 },
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 lg:py-32 relative">
      <div className="container-wide">
        <Reveal className="max-w-3xl mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            A full-stack toolkit for{" "}
            <span className="text-gradient-primary">intelligent products</span>.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 80}>
              <div className="glass rounded-3xl p-8 h-full hover:shadow-elegant transition-shadow">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display font-bold text-xl">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{gi + 1}
                  </span>
                </div>
                <div className="space-y-5">
                  {group.items.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span className="font-mono text-muted-foreground">
                          {s.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
