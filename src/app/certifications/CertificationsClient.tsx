"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Award, X, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Skeleton from "@mui/material/Skeleton";

// framer-motion 11 + TypeScript 6: motion("div") loses HTML attrs; cast restores them
const MotionDiv = motion("div") as React.FC<React.HTMLAttributes<HTMLDivElement> & MotionProps>;

const certifications = [
  {
    title: "Machine Learning Specialization",
    organization: "Deeplearning.AI",
    platform: "Coursera",
    path: "Machine Learning Specialization.jpg",
    skills: ["Supervised Learning", "Neural Networks", "Decision Trees", "Recommender Systems"],
  },
  {
    title: "Developing Applications with SQL and Django",
    organization: "IBM Skill Network",
    platform: "Coursera",
    path: "Coursera - Django.jpg",
    skills: ["Django", "SQL", "Python", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Java Fundamentals",
    organization: "Oracle",
    platform: null,
    path: "Oracle - Java.jpg",
    skills: ["Java", "OOP", "Data Structures", "Core Java"],
  },
  {
    title: "Machine Learning Foundation",
    organization: "iNeuron",
    platform: null,
    path: "iNeuron - ML.png",
    skills: ["ML Algorithms", "Python", "Feature Engineering", "Model Evaluation"],
  },
];

type Cert = (typeof certifications)[number];

function ImageWithSkeleton({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* MUI Skeleton overlay — fades out when image loads */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function CertificationsClient() {
  const [selected, setSelected] = useState<Cert | null>(null);

  const openModal = (cert: Cert) => setSelected(cert);
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-wide">

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
              <Award size={18} />
            </div>
            <h1 className="text-4xl font-display font-bold">Certifications</h1>
            <Chip 
              icon={<WorkspacePremiumIcon className="!text-primary" />} 
              label="Verified Credentials" 
              variant="outlined"
              size="small"
              className="ml-2 !border-primary/30 !text-primary !font-semibold"
            />
          </div>
          <p className="text-muted-foreground text-sm mb-14 ml-[52px]">
            Professional credentials and course completions.
          </p>
        </Reveal>

        {/* Grid — items-stretch keeps all cards equal height per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80} className="h-full">
              <button
                onClick={() => openModal(cert)}
                className="group glass rounded-2xl overflow-hidden text-left w-full h-full flex flex-col hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Fixed-height thumbnail */}
                <div className="relative w-full h-48 shrink-0 overflow-hidden bg-secondary/40">
                  <ImageWithSkeleton
                    src={`/certificates/${cert.path}`}
                    alt={cert.title}
                    priority={i < 2}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  {cert.platform && (
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold px-2 py-1 rounded-md bg-primary/90 text-primary-foreground shadow-glow">
                      {cert.platform}
                    </span>
                  )}
                </div>

                {/* Content — flex-1 fills remaining height, skills pinned to bottom */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-display font-bold text-base leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h2>
                  <div className="flex items-center gap-1.5 mb-4">
                    <BadgeCheck size={13} className="text-accent shrink-0" />
                    <span className="text-xs text-accent font-medium truncate">{cert.organization}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground font-mono">
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground font-mono">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Back link */}
        <Reveal delay={certifications.length * 80}>
          <div className="mt-16 flex justify-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              ← Back to portfolio
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <MotionDiv
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Panel wrapper — centers the modal */}
            <MotionDiv
              key="modal-wrap"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              {/* Modal panel */}
              <MotionDiv
                key="modal"
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden shadow-elegant pointer-events-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl glass grid place-items-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                {/* Certificate image — large 16:9 area */}
                <div className="relative w-full bg-secondary/30" style={{ aspectRatio: "16/9" }}>
                  <ImageWithSkeleton
                    src={`/certificates/${selected.path}`}
                    alt={selected.title}
                    priority
                    sizes="(max-width: 1280px) 100vw, 1024px"
                    className="object-contain p-6"
                  />
                </div>

                {/* Details */}
                <div className="p-6 pt-5 border-t border-border">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="font-display font-bold text-xl leading-snug mb-1.5">
                        {selected.title}
                      </h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <BadgeCheck size={14} className="text-accent shrink-0" />
                        <span className="text-sm text-accent font-medium">{selected.organization}</span>
                        {selected.platform && (
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-primary/20 text-primary">
                            {selected.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 rounded-full bg-secondary/80 text-muted-foreground font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
