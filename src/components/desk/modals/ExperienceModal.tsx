"use client";

import { motion } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

const EXPERIENCE = [
  {
    role: "Member of Technical Team",
    company: "Vendekin",
    period: "Jan 2025 – Present",
    type: "Full-time",
    color: "indigo",
    achievements: [
      "Built real-time error management system → 40% reduction in machine downtime",
      "Revamped refill machine UI → 50% faster operator response time",
      "Engineered advertising analytics platform tracking 10+ KPIs",
      "Developed promotional engines boosting ATV by 25–35%",
      "Implemented slot-based restriction system across 200+ SKUs",
    ],
    tech: ["React Native", "TypeScript", "FastAPI", "PostgreSQL", "MQTT"],
  },
  {
    role: "Member of Technical Team — Intern",
    company: "Vendekin",
    period: "Jul 2024 – Dec 2024",
    type: "Internship",
    color: "violet",
    achievements: [
      "Modernised legacy mobile app → 45% faster load times",
      "Built custom vending machine simulator server for offline testing",
      "Integrated real-time WebSocket telemetry into operator dashboard",
    ],
    tech: ["React Native", "JavaScript", "Django", "WebSockets"],
  },
  {
    role: "Data Science Intern",
    company: "Ahen Pvt. Ltd.",
    period: "Jan 2023 – Feb 2023",
    type: "Internship",
    color: "emerald",
    achievements: [
      "Scraped and structured 50k+ Google Maps data points for market analysis",
      "Delivered cleaned datasets using Python & Pandas for business intelligence",
    ],
    tech: ["Python", "Pandas", "BeautifulSoup", "Google Maps API"],
  },
  {
    role: "PHP Developer Trainee",
    company: "R. B. Tech Services",
    period: "Jul 2020 – Aug 2020",
    type: "Training",
    color: "amber",
    achievements: [
      "Built a notice management system for internal communications",
    ],
    tech: ["PHP", "MySQL", "HTML", "CSS"],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Technology — Artificial Intelligence",
    school: "AISSMS Institute of Information Technology",
    period: "2021 – 2024",
    note: "Focused on ML, computer vision & data systems",
  },
  {
    degree: "Diploma — Computer Engineering",
    school: "Government Polytechnic, Pune",
    period: "2018 – 2021",
    note: "Core CS fundamentals, networking & systems",
  },
  {
    degree: "SSC",
    school: "B. N. Sarda Vidyalaya, Thane",
    period: "2017 – 2018",
    note: "",
  },
];

const COLOR_MAP: Record<string, string> = {
  indigo: "border-indigo-500/30 bg-indigo-500/8",
  violet: "border-violet-500/25 bg-violet-500/6",
  emerald: "border-emerald-500/25 bg-emerald-500/6",
  amber: "border-amber-500/20 bg-amber-500/5",
};
const DOT_MAP: Record<string, string> = {
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};
const TAG_MAP: Record<string, string> = {
  indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  amber: "bg-amber-500/12 text-amber-300 border-amber-500/15",
};

export function ExperienceModal({ onClose }: Props) {
  return (
    <ModalWrapper
      title="Work Experience"
      subtitle="Building products that ship since 2020"
      icon="🎧"
      onClose={onClose}
      wide
    >
      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Experience column */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            Career Timeline
          </p>
          <div className="relative pl-5">
            {/* Timeline line */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/30 to-transparent" />

            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                className="relative mb-6 last:mb-0"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-5 top-2.5 w-2 h-2 rounded-full ${DOT_MAP[exp.color]} ring-2 ring-offset-1 ring-offset-[#0c0c1f] ring-current`}
                  style={{ color: exp.color === "indigo" ? "#6366f1" : exp.color === "violet" ? "#8b5cf6" : exp.color === "emerald" ? "#10b981" : "#f59e0b" }}
                />

                <div className={`rounded-xl border p-4 ${COLOR_MAP[exp.color]}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-white font-semibold text-sm font-display leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-white/50 font-mono mt-0.5">{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-white/35 font-mono">{exp.period}</p>
                      <span className="text-[9px] text-white/25 font-mono">{exp.type}</span>
                    </div>
                  </div>

                  <ul className="space-y-1 mb-3">
                    {exp.achievements.map((a, ai) => (
                      <li key={ai} className="flex items-start gap-1.5 text-xs text-white/50">
                        <span className="text-white/20 mt-0.5 shrink-0">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[9px] px-1.5 py-0.5 rounded-full border font-mono ${TAG_MAP[exp.color]}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education column */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            Education
          </p>
          <div className="space-y-4">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-white/8 bg-white/3 p-4"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              >
                <p className="text-[10px] text-white/30 font-mono mb-1">{edu.period}</p>
                <h3 className="text-white text-sm font-semibold font-display leading-tight mb-0.5">
                  {edu.degree}
                </h3>
                <p className="text-xs text-white/45 font-mono">{edu.school}</p>
                {edu.note && (
                  <p className="text-[10px] text-white/30 mt-2 italic">{edu.note}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Career journey summary */}
          <motion.div
            className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">
              Journey
            </p>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-white/60">Trainee</span>
              <span className="text-white/20">→</span>
              <span className="text-white/60">DS Intern</span>
              <span className="text-white/20">→</span>
              <span className="text-indigo-400">RN Intern</span>
              <span className="text-white/20">→</span>
              <span className="text-indigo-300 font-semibold">Full-time Dev</span>
              <span className="text-white/20">→</span>
              <span className="text-violet-300 animate-pulse">Future?</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ModalWrapper>
  );
}
