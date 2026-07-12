import { Reveal } from "./Reveal";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    role: "Member of Technical Team",
    org: "Vendekin Technologies",
    period: "Jan 2025 — Present",
    points: [
      "Designed and implemented an advanced real-time error management system with React Query and Firestore integration, logging daily error events while providing instant multi-language translations in 9+ languages, reducing machine downtime by 40%.",
      "Revamped refill machine workflow with modern, user-friendly UI featuring full offline-first architecture from planogram creation to product refilling, reducing refilling time by 50% and enabling seamless operations without network connectivity.",
      "Developed an end-to-end advertising analytics platform that tracks 10+ KPIs (play counts, completion rates, interruptions) across 300+ ad campaigns monthly, enabling transparent billing for third-party brands.",
      'Architected complex promotional engines driving 25–35% increase in Average Transaction Value (ATV), including "Buy X Get Y", "Meal Combos", and "Coupon" promotions with dynamic backend-driven logic across 500+ vending machines.',
      "Engineered contextual product visibility through a robust Slot-Based Restriction System managing 50+ products per machine, enabling granular control based on configuration, user segments, and real-time inventory across 200+ SKUs.",
    ],
  },
  {
    role: "Member of Technical Team — Intern",
    org: "Vendekin Technologies",
    period: "Jul 2024 — Dec 2024",
    points: [
      "Spearheaded complete application modernization of 50,000+ line codebase using latest React architecture and modern UI/UX design, achieving 45% faster load times and 30% setup time reduction.",
      "Developed a custom server to simulate request-response cycles for vending machines, streamlining system efficiency, reducing latency, and enhancing debugging capabilities.",
    ],
  },
  {
    role: "Data Science — Intern",
    org: "Ahen Pvt. Ltd.",
    period: "Jan 2023 — Feb 2023",
    points: [
      "Implemented advanced web scraping pipelines to collect & analyze Google Maps data.",
      "Derived insights driving optimization of marketing campaigns and customer satisfaction.",
    ],
  },
  {
    role: "PHP Developer — Trainee",
    org: "R. B. Tech Services",
    period: "Jul 2020 — Aug 2020",
    points: [
      "Designed and shipped a notice management system using PHP, SQL & JavaScript.",
      "Built database-backed responsive UI showcasing adaptability across the stack.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor's Degree (Artificial Intelligence)",
    org: "AISSMS Institute of Information Technology",
    period: "2021 — 2024",
  },
  {
    degree: "Diploma (Computer Engineering)",
    org: "Government Polytechnic",
    period: "2018 — 2021",
  },
  { degree: "SSC", org: "B. N. Sarda Vidyalaya", period: "2017 — 2018" },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                  <Briefcase size={18} />
                </div>
                <h2 className="text-3xl font-display font-bold">Experience</h2>
              </div>
            </Reveal>

            <div className="relative pl-8 border-l border-border space-y-10">
              {experience.map((e, i) => (
                <Reveal key={e.role} delay={i * 80}>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background shadow-glow" />
                    <div className="bg-card border border-border hover:border-primary/50 rounded-2xl p-6 shadow-[var(--shadow-card)] transition-colors">
                      <div className="flex flex-wrap justify-between gap-2 mb-1">
                        <h3 className="font-display font-bold text-lg">
                          {e.role}
                        </h3>
                        <span className="font-mono text-xs text-primary">
                          {e.period}
                        </span>
                      </div>
                      <div className="text-sm text-accent mb-4">{e.org}</div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                  <GraduationCap size={18} />
                </div>
                <h2 className="text-3xl font-display font-bold">Education</h2>
              </div>
            </Reveal>

            <div className="relative pl-8 border-l border-border space-y-10">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 80}>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-background" />
                    <div className="bg-card border border-border hover:border-accent/50 rounded-2xl p-6 shadow-[var(--shadow-card)] transition-colors">
                      <div className="flex flex-wrap justify-between gap-2 mb-1">
                        <h3 className="font-display font-bold text-lg">
                          {e.degree}
                        </h3>
                        <span className="font-mono text-xs text-accent">
                          {e.period}
                        </span>
                      </div>
                      <div className="text-sm text-primary">{e.org}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
