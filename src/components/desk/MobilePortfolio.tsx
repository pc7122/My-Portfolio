"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";

const SECTIONS = [
  {
    icon: "💻",
    title: "Projects",
    description: "Smart Vending OS, EmoSense, React Native apps, AI/ML pipelines",
    color: "from-indigo-900/50 to-violet-900/40",
    border: "border-indigo-500/25",
    tags: ["React Native", "FastAPI", "TensorFlow", "PostgreSQL"],
  },
  {
    icon: "🎧",
    title: "Experience",
    description: "Full-stack dev at Vendekin • 2+ years in production mobile & AI",
    color: "from-violet-900/40 to-purple-900/30",
    border: "border-violet-500/20",
    tags: ["Vendekin", "2025–Present", "Full-time"],
  },
  {
    icon: "📚",
    title: "Skills",
    description: "React Native · Python · TypeScript · TensorFlow · FastAPI · IoT",
    color: "from-blue-900/40 to-cyan-900/30",
    border: "border-blue-500/20",
    tags: ["90% RN", "88% Python", "82% AI/ML"],
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    description: "Deployed to 200+ vending machines · OTA updates · Real-time telemetry",
    color: "from-emerald-900/40 to-teal-900/25",
    border: "border-emerald-500/20",
    tags: ["200+ Machines", "React Native", "Expo EAS"],
  },
];

const LINKS = [
  { icon: Mail, label: "Email", href: "mailto:prathameshpc77@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/prathameshpc77" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/prathameshpc77" },
];

export default function MobilePortfolio() {
  return (
    <div
      className="min-h-screen px-4 py-8 space-y-6"
      style={{
        background: "radial-gradient(ellipse 130% 60% at 50% -5%, #1d0f45 0%, #080810 65%)",
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center pt-4 pb-2"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-300/60 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>
        <h1 className="text-3xl font-bold text-white font-display leading-tight">
          Prathamesh Chaudhary
        </h1>
        <p className="text-white/50 text-sm font-mono mt-1">
          React Native · AI/ML · IoT Engineer
        </p>
        <p className="text-xs text-white/25 font-mono mt-3 italic">
          🖥️ View on desktop for the interactive desk experience
        </p>
      </motion.div>

      {/* Section cards */}
      <div className="space-y-3">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            className={`rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} p-5`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold font-display">{s.title}</h3>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{s.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-white/45 border border-white/10 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { value: "2+", label: "Years shipping" },
          { value: "15+", label: "Projects" },
          { value: "200+", label: "Machines" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/8 bg-white/3 p-3 text-center"
          >
            <p className="text-xl font-bold text-white font-display">{stat.value}</p>
            <p className="text-[10px] text-white/35 font-mono mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Contact links */}
      <motion.div
        className="space-y-2 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-3">
          Get in touch
        </p>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-colors"
          >
            <link.icon size={16} className="text-indigo-400" />
            <span className="text-sm text-white font-mono">{link.label}</span>
            <ExternalLink size={12} className="ml-auto text-white/25" />
          </a>
        ))}

        <a
          href="mailto:prathameshpc77@gmail.com"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors mt-4"
        >
          <Mail size={15} />
          Let&apos;s Work Together
        </a>
      </motion.div>
    </div>
  );
}
