"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

export function PhoneObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
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
            📱 Mobile Apps
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 40px 8px rgba(99,102,241,0.3)", borderRadius: 18 }}
      />

      <svg width="72" height="142" viewBox="0 0 72 142" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Device body */}
        <rect x="1" y="1" width="70" height="140" rx="14" fill="#111122" stroke="#2a2a45" strokeWidth="1.2" />
        <rect x="3" y="3" width="66" height="136" rx="12" fill="#0c0c1c" />

        {/* Screen */}
        <rect x="5" y="10" width="62" height="122" rx="9" fill="#080814" />

        {/* Dynamic island */}
        <rect x="21" y="13" width="30" height="9" rx="4.5" fill="#050510" />

        {/* Side buttons */}
        <rect x="-1" y="40" width="2" height="16" rx="1" fill="#1e1e38" />
        <rect x="-1" y="60" width="2" height="22" rx="1" fill="#1e1e38" />
        <rect x="71" y="50" width="2" height="28" rx="1" fill="#1e1e38" />

        {/* Bottom bar */}
        <rect x="24" y="132" width="24" height="3" rx="1.5" fill="#1e1e38" />

        {/* ── SCREEN CONTENT — app-like UI ── */}
        {/* Status bar */}
        <text x="10" y="26" fontSize="5" fill="#6b6b9a" fontFamily="monospace">9:41</text>
        <text x="52" y="26" fontSize="5" fill="#6b6b9a" fontFamily="monospace">▮▮▮</text>

        {/* App header */}
        <rect x="7" y="30" width="58" height="16" rx="3" fill="#12122a" />
        <text x="36" y="41" fontSize="6.5" fill="#a5b4fc" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">
          My Apps
        </text>

        {/* App grid — 2×3 */}
        {[
          { x: 12, y: 52, color: "#6366f1", label: "Vend" },
          { x: 37, y: 52, color: "#8b5cf6", label: "Ops" },
          { x: 12, y: 78, color: "#3b82f6", label: "IoT" },
          { x: 37, y: 78, color: "#10b981", label: "ML" },
          { x: 12, y: 104, color: "#f59e0b", label: "RN" },
          { x: 37, y: 104, color: "#ec4899", label: "More" },
        ].map((app, i) => (
          <g key={i}>
            <motion.rect
              x={app.x}
              y={app.y}
              width="23"
              height="20"
              rx="5"
              fill={app.color}
              fillOpacity={0.85}
              animate={{ fillOpacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            />
            <text
              x={app.x + 11.5}
              y={app.y + 13}
              fontSize="6"
              fill="#fff"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="700"
            >
              {app.label}
            </text>
          </g>
        ))}

        {/* Screen shimmer on hover */}
        <motion.rect
          x="5"
          y="10"
          width="62"
          height="122"
          rx="9"
          fill="url(#phoneShimmer)"
          animate={{ opacity: hovered ? 0.15 : 0.04 }}
          transition={{ duration: 0.3 }}
        />

        {/* Notification dot */}
        <motion.circle
          cx="58"
          cy="52"
          r="4"
          fill="#6366f1"
          animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
        />
        <text x="58" y="55" fontSize="5" fill="#fff" textAnchor="middle" fontWeight="700">3</text>

        <defs>
          <linearGradient id="phoneShimmer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-lg opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
