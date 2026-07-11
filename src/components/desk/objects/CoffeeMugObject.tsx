"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

export function CoffeeMugObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            ☕ Fun Facts
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 35px 8px rgba(251,191,36,0.18)" }}
      />

      <svg width="72" height="100" viewBox="0 0 72 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ── STEAM ── */}
        {[
          { x: 20, delay: 0, amplitude: 3 },
          { x: 32, delay: 0.4, amplitude: -3 },
          { x: 44, delay: 0.8, amplitude: 3 },
        ].map((s, i) => (
          <motion.path
            key={i}
            d={`M ${s.x} 30 Q ${s.x + s.amplitude} 24 ${s.x} 18 Q ${s.x - s.amplitude} 12 ${s.x} 6`}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.5, 0],
              y: [0, -8, -16],
            }}
            transition={{
              duration: 2.2,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Mug body */}
        <path
          d="M8 33 L8 82 Q8 90 16 90 L50 90 Q58 90 58 82 L58 33 Q55 31 36 31 Q17 31 8 33Z"
          fill="#1e1e38"
          stroke="#2d2d52"
          strokeWidth="1.2"
        />

        {/* Mug interior top (coffee surface) */}
        <ellipse cx="33" cy="33" rx="25" ry="5" fill="#3d2006" />
        <ellipse cx="33" cy="33" rx="22" ry="3.5" fill="#4a2a08" />

        {/* Handle */}
        <path
          d="M58 45 Q72 45 72 55 Q72 65 58 65"
          stroke="#2d2d52"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M58 45 Q70 45 70 55 Q70 65 58 65"
          stroke="#1e1e38"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mug surface highlight */}
        <path
          d="M12 36 Q12 38 14 38 L14 80 Q14 82 16 82"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* "PC" logo on mug */}
        <motion.text
          x="33"
          y="66"
          fontSize="16"
          fill="#6366f1"
          fontFamily="monospace"
          textAnchor="middle"
          fontWeight="700"
          animate={{ fill: hovered ? "#818cf8" : "#6366f1" }}
          transition={{ duration: 0.3 }}
        >
          PC
        </motion.text>
        <text
          x="33"
          y="76"
          fontSize="5.5"
          fill="#4a4a80"
          fontFamily="monospace"
          textAnchor="middle"
        >
          .coffee()
        </text>

        {/* Mug bottom ring */}
        <ellipse cx="33" cy="90" rx="25" ry="4" fill="#181830" stroke="#252545" strokeWidth="0.8" />
      </svg>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 blur-lg opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
