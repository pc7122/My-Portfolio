"use client";

import { motion } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";
import { Mail, FileDown } from "lucide-react";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

interface Props {
  onClose: () => void;
}

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "prathameshpc77@gmail.com",
    href: "mailto:prathameshpc77@gmail.com",
    color: "#6366f1",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/25",
    hoverBg: "hover:bg-indigo-500/20",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/prathameshpc77",
    href: "https://www.linkedin.com/in/prathameshpc77",
    color: "#0ea5e9",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    hoverBg: "hover:bg-sky-500/18",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/prathameshpc77",
    href: "https://github.com/prathameshpc77",
    color: "#a78bfa",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    hoverBg: "hover:bg-violet-500/18",
  },
  {
    icon: FiInstagram,
    label: "Instagram",
    value: "@prathamesh.c77",
    href: "https://www.instagram.com/prathamesh.c77",
    color: "#f472b6",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    hoverBg: "hover:bg-pink-500/18",
  },
];

export function ContactModal({ onClose }: Props) {
  return (
    <ModalWrapper
      title="Let's Connect"
      subtitle="Open to full-time roles, freelance & collaborations"
      icon="📝"
      onClose={onClose}
    >
      <div className="p-6 space-y-6">
        {/* CTA banner */}
        <motion.div
          className="rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-violet-500/8 p-6 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="text-3xl mb-2">👋</div>
          <h3 className="text-white font-semibold text-lg font-display mb-1">
            Have a product that needs shipping?
          </h3>
          <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto">
            I&apos;m currently taking on full-time opportunities and freelance projects in mobile, backend, and applied ML.
          </p>
          <motion.a
            href="mailto:prathameshpc77@gmail.com"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={15} />
            Send an Email
          </motion.a>
        </motion.div>

        {/* Social links */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-3">
            Find Me On
          </p>
          <div className="space-y-2">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${link.bg} ${link.border} ${link.hoverBg} transition-all group`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${link.color}18` }}
                >
                  <link.icon size={17} style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm font-display">{link.label}</p>
                  <p className="text-xs text-white/35 font-mono truncate">{link.value}</p>
                </div>
                <span className="text-white/20 group-hover:text-white/50 transition-colors text-xs font-mono">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Resume download */}
        <motion.div
          className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div>
            <p className="text-white font-semibold text-sm font-display">Resume</p>
            <p className="text-xs text-white/35 font-mono">PDF · Last updated 2025</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/12 border border-white/8 text-white/60 hover:text-white transition-all text-xs font-mono"
          >
            <FileDown size={14} />
            Download
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          className="text-center text-xs text-white/25 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          📍 Pune, Maharashtra, India · Available remotely worldwide
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
