"use client";

import { motion } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

const SKILL_GROUPS = [
  {
    label: "Languages & Databases",
    skills: [
      { name: "Python", level: 88 },
      { name: "TypeScript / JavaScript", level: 85 },
      { name: "SQL", level: 80 },
    ],
    accent: "#6366f1",
  },
  {
    label: "Frameworks",
    skills: [
      { name: "React Native", level: 90 },
      { name: "React / Next.js", level: 82 },
      { name: "FastAPI / Django REST", level: 83 },
      { name: "Tailwind CSS", level: 88 },
    ],
    accent: "#a78bfa",
  },
  {
    label: "AI / ML",
    skills: [
      { name: "TensorFlow / PyTorch", level: 78 },
      { name: "OpenCV / YOLOv5", level: 82 },
      { name: "Pandas / NumPy", level: 85 },
      { name: "LLM APIs (Claude, OpenAI)", level: 80 },
    ],
    accent: "#34d399",
  },
  {
    label: "Backend & IoT",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MQTT / WebSockets", level: 78 },
      { name: "Raspberry Pi / Arduino", level: 72 },
      { name: "Docker", level: 68 },
    ],
    accent: "#60a5fa",
  },
  {
    label: "Tools",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Firebase", level: 80 },
      { name: "Postman", level: 88 },
      { name: "Claude Code / Cursor", level: 88 },
    ],
    accent: "#fbbf24",
  },
  {
    label: "Testing",
    skills: [
      { name: "Jest", level: 78 },
      { name: "Mocha / Chai", level: 72 },
    ],
    accent: "#f472b6",
  },
];

const CERTS = [
  {
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    year: "2023",
    color: "#6366f1",
  },
  {
    name: "React Native — The Practical Guide",
    issuer: "Udemy",
    year: "2023",
    color: "#8b5cf6",
  },
  {
    name: "Python for Data Science",
    issuer: "IBM / Coursera",
    year: "2022",
    color: "#3b82f6",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google / Coursera",
    year: "2023",
    color: "#10b981",
  },
];

export function LearningModal({ onClose }: Props) {
  return (
    <ModalWrapper
      title="Skills & Learning"
      subtitle="Always building, always learning"
      icon="📚"
      onClose={onClose}
      wide
    >
      <div className="p-6 space-y-8">
        {/* Skills */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-5">
            Proficiency
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.07 }}
              >
                <p className="text-xs font-semibold font-mono mb-3" style={{ color: group.accent }}>
                  {group.label}
                </p>
                <div className="space-y-3">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60 font-mono">{skill.name}</span>
                        <span className="font-mono" style={{ color: group.accent }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${group.accent}aa, ${group.accent})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 0.9,
                            delay: gi * 0.07 + si * 0.05,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            Certifications
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{ background: cert.color }}
                />
                <div>
                  <p className="text-sm text-white font-semibold font-display leading-tight">
                    {cert.name}
                  </p>
                  <p className="text-xs text-white/40 font-mono mt-0.5">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Currently learning */}
        <motion.div
          className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-indigo-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <p className="text-xs text-indigo-400 font-mono uppercase tracking-wider">
              Currently Exploring
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "AI Agents & MCP",
              "LLM Fine-tuning",
              "RAG Systems",
              "Advanced System Design",
              "Kubernetes",
              "Rust",
            ].map((topic) => (
              <span
                key={topic}
                className="text-xs px-3 py-1 rounded-full bg-indigo-500/12 text-indigo-300 border border-indigo-500/20 font-mono"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
