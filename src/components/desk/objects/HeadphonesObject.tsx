"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

export function HeadphonesObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            🎧 Work Experience
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 40px 8px rgba(99,102,241,0.22)" }}
      />

      <svg width="108" height="88" viewBox="0 0 108 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Headband arc */}
        <path
          d="M14 52 Q14 6 54 6 Q94 6 94 52"
          stroke="#1e1e38"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 52 Q14 6 54 6 Q94 6 94 52"
          stroke="#2a2a4a"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Headband highlight */}
        <path
          d="M20 50 Q20 12 54 12 Q88 12 88 50"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Metal adjustment sliders */}
        <rect x="8" y="46" width="12" height="18" rx="3" fill="#141428" stroke="#252545" strokeWidth="0.8" />
        <rect x="88" y="46" width="12" height="18" rx="3" fill="#141428" stroke="#252545" strokeWidth="0.8" />
        <rect x="10" y="52" width="8" height="2" rx="1" fill="#6366f1" opacity={0.6} />
        <rect x="90" y="52" width="8" height="2" rx="1" fill="#6366f1" opacity={0.6} />

        {/* ── EAR CUPS ── */}
        {/* Left ear cup */}
        <ellipse cx="14" cy="66" rx="13" ry="16" fill="#141428" stroke="#252545" strokeWidth="1.2" />
        <ellipse cx="14" cy="66" rx="9" ry="11" fill="#0d0d1e" />
        <motion.ellipse
          cx="14"
          cy="66"
          rx="6"
          ry="7"
          fill="#1a1a36"
          animate={{ fill: hovered ? "#1f1f45" : "#1a1a36" }}
          transition={{ duration: 0.3 }}
        />
        <circle cx="14" cy="66" r="2" fill="#6366f1" opacity={0.6} />

        {/* Right ear cup */}
        <ellipse cx="94" cy="66" rx="13" ry="16" fill="#141428" stroke="#252545" strokeWidth="1.2" />
        <ellipse cx="94" cy="66" rx="9" ry="11" fill="#0d0d1e" />
        <motion.ellipse
          cx="94"
          cy="66"
          rx="6"
          ry="7"
          fill="#1a1a36"
          animate={{ fill: hovered ? "#1f1f45" : "#1a1a36" }}
          transition={{ duration: 0.3 }}
        />
        <circle cx="94" cy="66" r="2" fill="#6366f1" opacity={0.6} />

        {/* Sound wave animation on hover */}
        {hovered && (
          <>
            {[0, 1, 2].map((ring) => (
              <motion.circle
                key={ring}
                cx="14"
                cy="66"
                r={10 + ring * 6}
                stroke="#6366f1"
                strokeWidth="0.8"
                fill="none"
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 1.5, delay: ring * 0.4, repeat: Infinity }}
              />
            ))}
          </>
        )}

        {/* Cable */}
        <path
          d="M14 82 Q14 90 20 90 L88 90 Q94 90 94 82"
          stroke="#111122"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="54" cy="90" r="3" fill="#1a1a32" stroke="#252545" strokeWidth="0.8" />
      </svg>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-lg opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
