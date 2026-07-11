"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

const PROJECTS = [
  {
    title: "Smart Vending OS",
    description:
      "Full-stack platform powering 200+ vending machines. Features real-time monitoring, advertising analytics, promotional engines, and slot-based restriction systems. Reduced machine downtime by 40%.",
    tags: ["React Native", "TypeScript", "FastAPI", "PostgreSQL", "MQTT", "WebSockets"],
    link: "https://vendekin.com",
    featured: true,
    color: "from-indigo-900/50 to-violet-900/40",
    border: "border-indigo-500/25",
    year: "2024–Present",
    impact: "40% ↓ downtime",
  },
  {
    title: "EmoSense",
    description:
      "Computer vision system combining facial micro-expression analysis and audio prosody detection to classify emotional states in real time.",
    tags: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
    github: "https://github.com/prathameshpc77",
    featured: false,
    color: "from-emerald-900/40 to-teal-900/30",
    border: "border-emerald-500/20",
    year: "2024",
    impact: "Multi-modal AI",
  },
  {
    title: "Operator Mobile App",
    description:
      "React Native fleet monitoring app for Vendekin operators. Includes real-time error alerts, inventory tracking, and in-app refill management. Cut operator response time by 50%.",
    tags: ["React Native", "TypeScript", "Tailwind", "Firebase"],
    featured: false,
    color: "from-blue-900/40 to-cyan-900/30",
    border: "border-blue-500/20",
    year: "2024",
    impact: "50% ↓ response time",
  },
  {
    title: "Real-time Data Pipeline",
    description:
      "High-throughput data ingestion and transformation pipeline for vending machine telemetry. Tracks 10+ KPIs across the fleet.",
    tags: ["Python", "FastAPI", "PostgreSQL", "SQL"],
    featured: false,
    color: "from-orange-900/35 to-amber-900/25",
    border: "border-orange-500/20",
    year: "2024",
    impact: "10+ KPIs tracked",
  },
  {
    title: "Plant Disease Detection",
    description:
      "CNN-based classifier that identifies 38 plant diseases from leaf images. Full-stack app with a React frontend and FastAPI inference endpoint.",
    tags: ["TensorFlow", "FastAPI", "React", "Python"],
    github: "https://github.com/prathameshpc77",
    link: "https://plant-disease-demo.vercel.app",
    featured: false,
    color: "from-green-900/40 to-lime-900/30",
    border: "border-green-500/20",
    year: "2023",
    impact: "38 disease classes",
  },
  {
    title: "YOLOv5 Car Detection",
    description:
      "Real-time vehicle detection and counting system built on YOLOv5. Trained on a custom dataset for Indian traffic scenarios.",
    tags: ["YOLOv5", "OpenCV", "Python", "TensorFlow"],
    github: "https://github.com/prathameshpc77",
    featured: false,
    color: "from-pink-900/35 to-rose-900/25",
    border: "border-pink-500/20",
    year: "2023",
    impact: "Real-time detection",
  },
];

export function ProjectsModal({ onClose }: Props) {
  return (
    <ModalWrapper
      title="Projects"
      subtitle="Built with intention, shipped with care"
      icon="💻"
      onClose={onClose}
      wide
    >
      <div className="p-6 space-y-4">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            className={`relative rounded-xl border ${project.border} bg-gradient-to-br ${project.color} p-5 overflow-hidden`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            {project.featured && (
              <div className="absolute top-3 right-3 text-[10px] font-mono text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                ✦ Featured
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-white font-semibold text-[0.95rem] font-display">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-white/30 font-mono">{project.year}</span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-3">{project.description}</p>

                {/* Impact badge */}
                <div className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mb-3">
                  ↗ {project.impact}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-white/50 border border-white/8 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/6 hover:bg-white/12 border border-white/8 text-white/50 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-500/25 text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* GitHub CTA */}
        <motion.a
          href="https://github.com/prathameshpc77"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/8 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Github size={15} />
          View all on GitHub →
        </motion.a>
      </div>
    </ModalWrapper>
  );
}
