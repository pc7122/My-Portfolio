"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalWrapperProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}

export function ModalWrapper({
  title,
  subtitle,
  icon,
  onClose,
  children,
  wide = false,
}: ModalWrapperProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-lg"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className={`relative w-full ${wide ? "max-w-5xl" : "max-w-4xl"} max-h-[88vh] flex flex-col rounded-2xl border border-white/8 overflow-hidden`}
        style={{
          background: "linear-gradient(145deg, #0c0c1f 0%, #0f0f24 50%, #0c0c1f 100%)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)",
        }}
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/6 shrink-0">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-2xl leading-none" role="img" aria-hidden>
                {icon}
              </span>
            )}
            <div>
              <h2 className="text-[1.1rem] font-semibold text-white leading-tight font-display">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-white/40 mt-0.5 font-mono">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 min-h-0">{children}</div>
      </motion.div>
    </motion.div>
  );
}
