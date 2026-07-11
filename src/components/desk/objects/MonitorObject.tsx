"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

const CHAT_MSGS = [
  { role: "user", text: "Who is Prathamesh?" },
  { role: "ai", text: "A full-stack engineer specialising in React Native, AI/ML & IoT ✨" },
  { role: "user", text: "Should I hire him?" },
  { role: "ai", text: "Absolutely. Click to find out why! →" },
];

export function MonitorObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState(0);

  useEffect(() => {
    if (visibleMsgs < CHAT_MSGS.length) {
      const t = setTimeout(() => setVisibleMsgs((v) => v + 1), 1600);
      return () => clearTimeout(t);
    }
  }, [visibleMsgs]);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisibleMsgs(0);
      setTimeout(() => setVisibleMsgs(1), 400);
    }, 10000);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            🖥️ Ask AI Prathamesh
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 60px 15px rgba(99,102,241,0.3)" }}
      />

      <svg width="308" height="196" viewBox="0 0 308 196" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ── MONITOR BODY ── */}
        <rect x="2" y="2" width="304" height="166" rx="10" fill="#0e0e1e" stroke="#252545" strokeWidth="1.5" />
        <rect x="4" y="4" width="300" height="162" rx="8" fill="#08081a" />

        {/* Power LED */}
        <motion.circle
          cx="154"
          cy="170"
          r="2.5"
          fill="#6366f1"
          animate={{ opacity: hovered ? [0.8, 0.4, 0.8] : 0.5 }}
          transition={{ duration: 1.8, repeat: hovered ? Infinity : 0 }}
        />

        {/* ── STAND ── */}
        <rect x="128" y="166" width="52" height="20" rx="0" fill="#111122" />
        {/* Stand taper */}
        <path d="M128 166 L124 186 L184 186 L180 166Z" fill="#111122" />
        {/* Base */}
        <rect x="110" y="184" width="88" height="10" rx="4" fill="#141428" stroke="#252545" strokeWidth="0.8" />

        {/* ── SCREEN CONTENT — CHAT UI ── */}
        {/* Header */}
        <rect x="4" y="4" width="300" height="22" rx="8" fill="#0d0d20" />
        <circle cx="16" cy="15" r="4.5" fill="#ff5f56" />
        <circle cx="28" cy="15" r="4.5" fill="#ffbd2e" />
        <circle cx="40" cy="15" r="4.5" fill="#27c93f" />
        <text x="154" y="19" fontSize="8" fill="#4a4a7a" fontFamily="monospace" textAnchor="middle">
          AI Prathamesh — Ask me anything
        </text>

        {/* Chat area */}
        <rect x="6" y="28" width="296" height="134" rx="0" fill="#060612" />

        {/* Chat messages */}
        {CHAT_MSGS.slice(0, visibleMsgs).map((msg, i) => {
          const isUser = msg.role === "user";
          const y = 38 + i * 30;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Bubble */}
              <rect
                x={isUser ? 160 : 10}
                y={y}
                width={Math.min(msg.text.length * 5.2 + 16, 130)}
                height={18}
                rx={5}
                fill={isUser ? "#3730a3" : "#1e1e38"}
                stroke={isUser ? "#4f46e5" : "#2d2d52"}
                strokeWidth={0.6}
              />
              <text
                x={isUser ? 168 : 18}
                y={y + 12}
                fontSize={7}
                fill={isUser ? "#c7d2fe" : "#94a3b8"}
                fontFamily="monospace"
              >
                {msg.text.length > 24 ? msg.text.slice(0, 24) + "…" : msg.text}
              </text>
            </motion.g>
          );
        })}

        {/* Typing indicator when transitioning */}
        {visibleMsgs < CHAT_MSGS.length && visibleMsgs % 2 === 1 && (
          <g>
            <rect x="10" y={38 + visibleMsgs * 30} width={42} height={16} rx={5} fill="#1e1e38" />
            {[0, 1, 2].map((dot) => (
              <motion.circle
                key={dot}
                cx={20 + dot * 8}
                cy={38 + visibleMsgs * 30 + 8}
                r={2.5}
                fill="#6366f1"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.8, delay: dot * 0.2, repeat: Infinity }}
              />
            ))}
          </g>
        )}

        {/* Input bar */}
        <rect x="6" y="152" width="296" height="10" fill="#0a0a1c" />
        <rect x="10" y="153" width="220" height="8" rx="3" fill="#111126" stroke="#252545" strokeWidth="0.6" />
        <text x="18" y="159" fontSize="6" fill="#3d3d6a" fontFamily="monospace">
          Ask anything about Prathamesh...
        </text>
        <rect x="236" y="153" width="32" height="8" rx="3" fill="#4f46e5" />
        <text x="252" y="159" fontSize="6" fill="#fff" textAnchor="middle" fontFamily="monospace">Send</text>

        {/* Screen glow */}
        <motion.rect
          x="4"
          y="4"
          width="300"
          height="162"
          rx="8"
          fill="url(#monitorGlow)"
          animate={{ opacity: hovered ? 0.1 : 0.04 }}
          transition={{ duration: 0.3 }}
        />

        <defs>
          <radialGradient id="monitorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-5 blur-xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
