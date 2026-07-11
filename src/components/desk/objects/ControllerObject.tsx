"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

export function ControllerObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  const pressButton = (btn: string) => {
    setPressedBtn(btn);
    setTimeout(() => setPressedBtn(null), 200);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            🎮 Hobbies & Achievements
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 40px 8px rgba(99,102,241,0.22)" }}
      />

      <svg width="148" height="98" viewBox="0 0 148 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Controller body */}
        <path
          d="M30 20 Q10 20 6 38 L2 72 Q0 88 14 88 Q24 88 32 76 Q40 64 44 62 L60 60 L88 60 L104 62 Q108 64 116 76 Q124 88 134 88 Q148 88 146 72 L142 38 Q138 20 118 20 Z"
          fill="#111122"
          stroke="#2a2a45"
          strokeWidth="1.2"
        />

        {/* Body center ridge */}
        <path
          d="M44 62 Q60 58 74 58 Q88 58 104 62"
          stroke="#1a1a35"
          strokeWidth="3"
          fill="none"
        />

        {/* ── D-PAD (left side) ── */}
        <rect x="22" y="30" width="8" height="24" rx="2" fill="#1e1e38" />
        <rect x="14" y="38" width="24" height="8" rx="2" fill="#1e1e38" />
        <circle cx="26" cy="42" r="5" fill="#252545" />

        {/* ── FACE BUTTONS (right side) ── */}
        {[
          { cx: 112, cy: 34, color: "#22c55e", label: "A", id: "A" },
          { cx: 122, cy: 42, color: "#3b82f6", label: "B", id: "B" },
          { cx: 102, cy: 42, color: "#f59e0b", label: "X", id: "X" },
          { cx: 112, cy: 50, color: "#ec4899", label: "Y", id: "Y" },
        ].map((btn) => (
          <motion.g
            key={btn.id}
            onTap={() => pressButton(btn.id)}
            animate={{ scale: pressedBtn === btn.id ? 0.8 : hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
          >
            <circle cx={btn.cx} cy={btn.cy} r={6} fill={btn.color} opacity={0.85} />
            <text
              x={btn.cx}
              y={btn.cy + 2.5}
              fontSize="6"
              fill="#fff"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="700"
            >
              {btn.label}
            </text>
          </motion.g>
        ))}

        {/* ── ANALOG STICKS ── */}
        {/* Left stick */}
        <circle cx="42" cy="52" r="11" fill="#0d0d1e" stroke="#1e1e38" strokeWidth="1" />
        <motion.circle
          cx="42"
          cy="52"
          r="7"
          fill="#1a1a34"
          animate={{
            cx: hovered ? [42, 44, 40, 42] : 42,
            cy: hovered ? [52, 50, 54, 52] : 52,
          }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
        />
        <circle cx="42" cy="52" r="3" fill="#252545" />

        {/* Right stick */}
        <circle cx="96" cy="52" r="11" fill="#0d0d1e" stroke="#1e1e38" strokeWidth="1" />
        <motion.circle
          cx="96"
          cy="52"
          r="7"
          fill="#1a1a34"
          animate={{
            cx: hovered ? [96, 94, 98, 96] : 96,
            cy: hovered ? [52, 54, 50, 52] : 52,
          }}
          transition={{ duration: 1.8, repeat: hovered ? Infinity : 0, delay: 0.4 }}
        />
        <circle cx="96" cy="52" r="3" fill="#252545" />

        {/* ── CENTER BUTTONS ── */}
        <rect x="61" y="36" width="12" height="7" rx="3.5" fill="#1a1a35" />
        <rect x="75" y="36" width="12" height="7" rx="3.5" fill="#1a1a35" />
        {/* Home button */}
        <circle cx="74" cy="48" r="5" fill="#6366f1" opacity={0.7} />
        <circle cx="74" cy="48" r="3" fill="#4f46e5" />

        {/* LED indicator */}
        <motion.circle
          cx="74"
          cy="28"
          r="3"
          fill="#6366f1"
          animate={{ opacity: hovered ? [0.8, 0.3, 0.8] : 0.3 }}
          transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
        />

        {/* Shoulder buttons */}
        <rect x="8" y="18" width="30" height="7" rx="3" fill="#181830" stroke="#2a2a45" strokeWidth="0.8" />
        <rect x="110" y="18" width="30" height="7" rx="3" fill="#181830" stroke="#2a2a45" strokeWidth="0.8" />
      </svg>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-lg opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
