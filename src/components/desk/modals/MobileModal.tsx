"use client";

import { motion } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

const APPS = [
  {
    title: "Vending Machine OS",
    company: "Vendekin",
    description:
      "Core mobile app powering the Vendekin platform. Real-time machine telemetry, error management, and analytics dashboard for fleet operators.",
    features: [
      "Real-time WebSocket telemetry",
      "Push notification alerts",
      "OTA update system",
      "Advertising slot management",
      "Offline-first architecture",
    ],
    tech: ["React Native", "TypeScript", "MQTT", "WebSockets", "FastAPI"],
    impact: "200+ machines • 40% ↓ downtime",
    accent: "#6366f1",
  },
  {
    title: "Operator Mobile App",
    company: "Vendekin",
    description:
      "Dedicated app for field operators managing refills, maintenance, and inventory. Redesigned UX cut response time by 50%.",
    features: [
      "Slot-based inventory tracking",
      "Refill workflow with photo capture",
      "Live machine status map",
      "In-app error resolution guide",
    ],
    tech: ["React Native", "TypeScript", "Firebase", "Tailwind"],
    impact: "50% ↓ operator response time",
    accent: "#8b5cf6",
  },
  {
    title: "Smart Vending Simulator",
    company: "Vendekin — Internal",
    description:
      "Custom hardware-in-the-loop simulator server that mirrors real vending machine behaviour for development and testing without physical hardware.",
    features: [
      "Mock sensor data generation",
      "MQTT event simulation",
      "Offline testing support",
      "Error injection for QA",
    ],
    tech: ["Python", "MQTT", "FastAPI", "React Native"],
    impact: "Faster dev cycles",
    accent: "#10b981",
  },
];

const RN_HIGHLIGHTS = [
  { label: "OTA Updates", value: "Expo + EAS", color: "#6366f1" },
  { label: "State Management", value: "Zustand + Context", color: "#8b5cf6" },
  { label: "Navigation", value: "React Navigation v6", color: "#3b82f6" },
  { label: "Styling", value: "NativeWind / Tailwind", color: "#10b981" },
  { label: "Testing", value: "Jest + Detox", color: "#f59e0b" },
  { label: "Push Notifications", value: "Firebase FCM", color: "#ec4899" },
];

export function MobileModal({ onClose }: Props) {
  return (
    <ModalWrapper
      title="Mobile Development"
      subtitle="React Native applications in production"
      icon="📱"
      onClose={onClose}
      wide
    >
      <div className="p-6 space-y-6">
        {/* App showcase */}
        {APPS.map((app, i) => (
          <motion.div
            key={app.title}
            className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="px-5 py-3 border-b border-white/6"
              style={{ background: `${app.accent}10` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold font-display">{app.title}</h3>
                  <p className="text-xs text-white/40 font-mono">{app.company}</p>
                </div>
                <div
                  className="text-[10px] font-mono px-2 py-1 rounded-full border"
                  style={{ color: app.accent, borderColor: `${app.accent}40`, background: `${app.accent}12` }}
                >
                  ↗ {app.impact}
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-white/55 mb-4 leading-relaxed">{app.description}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-2">
                    Key Features
                  </p>
                  <ul className="space-y-1.5">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                        <span style={{ color: app.accent }}>▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/45 border border-white/8 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* RN toolkit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-4">
            React Native Toolkit
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RN_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/6 bg-white/3 p-3"
              >
                <p className="text-[10px] text-white/35 font-mono mb-0.5">{item.label}</p>
                <p className="text-xs font-semibold font-mono" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
