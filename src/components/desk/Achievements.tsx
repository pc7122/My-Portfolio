"use client";

import { motion } from "framer-motion";
import { Achievement } from "./DeskScene";

interface Props {
  achievement: Achievement;
}

export function AchievementToast({ achievement }: Props) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] pointer-events-none"
      initial={{ opacity: 0, y: 20, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-yellow-500/30 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(20,15,50,0.95) 0%, rgba(10,10,25,0.95) 100%)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(234,179,8,0.15)",
        }}
      >
        <motion.div
          className="text-xl"
          animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {achievement.icon}
        </motion.div>
        <div>
          <p className="text-[10px] text-yellow-400/70 font-mono uppercase tracking-widest leading-none mb-0.5">
            Achievement Unlocked
          </p>
          <p className="text-sm text-white font-semibold font-display leading-tight">
            {achievement.title}
          </p>
        </div>
        <div className="ml-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-yellow-400"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}
