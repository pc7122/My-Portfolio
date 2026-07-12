"use client";

import { motion } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";
import { Achievement } from "../DeskScene";

interface Props {
  onClose: () => void;
  achievements: Achievement[];
}

const HOBBIES = [
  {
    icon: "🎮",
    title: "Gaming",
    description:
      "Strategy games, open-world RPGs, and the occasional competitive shooter. Games that make you think differently.",
    tags: ["Strategy", "RPG", "FPS"],
    color: "#6366f1",
  },
  {
    icon: "🤖",
    title: "AI Tinkering",
    description:
      "Building micro-projects with LLMs, experimenting with agents, prompt engineering, and local model inference.",
    tags: ["LLMs", "Agents", "RAG"],
    color: "#8b5cf6",
  },
  {
    icon: "📷",
    title: "Photography",
    description:
      "Street and landscape photography — capturing light, geometry, and the overlooked detail in everyday scenes.",
    tags: ["Street", "Landscape", "Architecture"],
    color: "#3b82f6",
  },
  {
    icon: "🎵",
    title: "Music",
    description:
      "Lo-fi playlists for focus, cinematic scores for inspiration, and the occasional dive into music production.",
    tags: ["Lo-fi", "Cinematic", "Production"],
    color: "#10b981",
  },
  {
    icon: "📖",
    title: "Technical Reading",
    description:
      "System design, AI research papers, engineering blogs, and anything that sharpens the mental model.",
    tags: ["System Design", "AI/ML", "Engineering"],
    color: "#f59e0b",
  },
  {
    icon: "🛠️",
    title: "Side Projects",
    description:
      "Weekend experiments — IoT gadgets, CLI tools, and mini-apps that scratch a personal itch.",
    tags: ["IoT", "CLI Tools", "Automation"],
    color: "#ec4899",
  },
];

export function HobbiesModal({ onClose, achievements }: Props) {
  const unlocked = achievements.filter((a) => a.unlocked);
  const mainAchievements = achievements.filter((a) => a.id !== "all");
  const specialAchievements = achievements.filter((a) => a.id === "all" || a.id === "easter_egg");

  return (
    <ModalWrapper
      title="Hobbies & Personality"
      subtitle="Beyond the code editor"
      icon="🎮"
      onClose={onClose}
      wide
    >
      <div className="p-6 space-y-8">
        {/* Hobbies grid */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            What I Do For Fun
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {HOBBIES.map((hobby, i) => (
              <motion.div
                key={hobby.title}
                className="rounded-xl border border-white/8 bg-white/3 p-4 group hover:border-white/15 hover:bg-white/5 transition-all"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-2xl mb-2">{hobby.icon}</div>
                <h3 className="text-white font-semibold text-sm font-display mb-1">
                  {hobby.title}
                </h3>
                <p className="text-xs text-white/45 leading-relaxed mb-3">{hobby.description}</p>
                <div className="flex flex-wrap gap-1">
                  {hobby.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-mono border border-white/8 text-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            Desk Achievements — {unlocked.length}/{achievements.length} Unlocked
          </p>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-white/6 mb-5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {mainAchievements.map((ach) => (
              <motion.div
                key={ach.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                  ach.unlocked
                    ? "border-indigo-500/30 bg-indigo-500/8"
                    : "border-white/5 bg-white/2 opacity-50"
                }`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: ach.unlocked ? 1 : 0.4, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-lg">{ach.unlocked ? ach.icon : "🔒"}</span>
                <div>
                  <p
                    className={`text-xs font-semibold font-mono ${
                      ach.unlocked ? "text-indigo-300" : "text-white/30"
                    }`}
                  >
                    {ach.title}
                  </p>
                  {!ach.unlocked && (
                    <p className="text-[9px] text-white/20 font-mono">Explore the desk to unlock</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special achievements */}
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {specialAchievements.map((ach) => (
              <motion.div
                key={ach.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                  ach.unlocked
                    ? "border-yellow-500/40 bg-yellow-500/8"
                    : "border-white/5 bg-white/2 opacity-40"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: ach.unlocked ? 1 : 0.3 }}
              >
                <span className="text-lg">{ach.unlocked ? ach.icon : "🔒"}</span>
                <div>
                  <p
                    className={`text-xs font-semibold font-mono ${
                      ach.unlocked ? "text-yellow-300" : "text-white/25"
                    }`}
                  >
                    {ach.title}
                  </p>
                  {!ach.unlocked && (
                    <p className="text-[9px] text-white/15 font-mono">
                      {ach.id === "easter_egg" ? 'Type "hireme" to unlock' : "Unlock all main achievements"}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
