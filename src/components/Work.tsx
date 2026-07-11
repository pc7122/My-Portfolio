import Image, { StaticImageData } from "next/image";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";
import vending from "@/assets/project-vending.jpg";
import emosenseImg from "../../public/thumbnails/Emosense.png";
import plantImg from "../../public/thumbnails/Plant.png";
import carImg from "../../public/thumbnails/Car Object Detection.png";
import todoImg from "../../public/thumbnails/Todo App.png";
import tictactoeImg from "../../public/thumbnails/Tic Tac Toe.png";
import myshowsImg from "../../public/thumbnails/MyShows.png";

type Project = {
  title: string;
  tag: string;
  image: string | StaticImageData;
  stack: string[];
  desc: string;
  span: string;
  accent?: boolean;
};

const projects: Project[] = [
  {
    title: "Smart Vending OS",
    tag: "Backend & Mobile",
    image: vending,
    stack: ["React Native", "TypeScript", "Firebase", "SQL", "Serial Protocol"],
    desc: "End-to-end platform for connected vending machines — operator app, real-time inventory state, contactless payments, and backend management.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
  },
  {
    title: "EmoSense",
    tag: "Computer Vision",
    image: emosenseImg,
    stack: ["TensorFlow", "OpenCV"],
    desc: "Multimodal emotion recognition combining facial micro-expressions with audio prosody.",
    span: "lg:col-span-2",
  },
  {
    title: "Plant Disease Detection",
    tag: "AI · FastAPI",
    image: plantImg,
    stack: ["FastAPI", "TensorFlow", "React"],
    desc: "CNN classifier diagnosing leaf disease from a single photo, served via FastAPI.",
    span: "lg:col-span-2",
  },
  {
    title: "YOLOv5 Car Detection",
    tag: "Computer Vision",
    image: carImg,
    stack: ["TensorFlow", "YOLOv5"],
    desc: "Real-time vehicle detection pipeline tuned for low-light traffic footage.",
    span: "lg:col-span-2",
  },
  {
    title: "Todo App (Django & React)",
    tag: "Full-Stack",
    image: todoImg,
    stack: ["Django", "React", "JWT", "REST API"],
    desc: "Todo application built with Django REST Framework and React, featuring secure JWT-based user authentication.",
    span: "lg:col-span-2",
  },
  {
    title: "Tic Tac Toe AI",
    tag: "Android",
    image: tictactoeImg,
    stack: ["Android Studio", "Java", "Minimax AI"],
    desc: "An Android game featuring an unbeatable AI opponent utilizing the Minimax decision-making algorithm.",
    span: "lg:col-span-2",
  },
  {
    title: "MyShows",
    tag: "Web App",
    image: myshowsImg,
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    desc: "A movie ticket booking web portal managing user reservations, showtimes, and movie information.",
    span: "lg:col-span-2",
  },
];

export const Work = () => {
  return (
    <section id="work" className="py-24 lg:py-32 relative">
      <div className="container-wide">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              Selected work
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Things I've shipped{" "}
              <span className="text-gradient-primary">recently.</span>
            </h2>
          </div>
          <a
            href="#mobile"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            See mobile & backend focus <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="h-full">
              <article
                className={`group flex flex-col h-full rounded-3xl overflow-hidden glass cursor-pointer transition-all duration-500 hover:shadow-elegant bg-card/30 backdrop-blur-md border border-white/5 hover:border-primary/20 ${
                  p.accent ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                <div className="flex flex-col flex-1 p-6 lg:p-7 justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-widest text-primary">
                        {p.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full glass-strong grid place-items-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-display font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {p.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-muted-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
