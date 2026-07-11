"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

type Photo = {
  src: string;
  alt: string;
  span?: string;
};

const photos: Photo[] = [
  { src: "/photos/1.jpg", alt: "Photograph 1", span: "md:col-span-2 md:row-span-2" },
  { src: "/photos/2.jpg", alt: "Photograph 2" },
  { src: "/photos/3.jpg", alt: "Photograph 3" },
  { src: "/photos/4.jpg", alt: "Photograph 4" },
  { src: "/photos/5.jpg", alt: "Photograph 5" },
  { src: "/photos/6.jpg", alt: "Photograph 6", span: "md:col-span-2" },
  { src: "/photos/7.jpg", alt: "Photograph 7" },
  { src: "/photos/8.jpg", alt: "Photograph 8" },
  { src: "/photos/9.jpg", alt: "Photograph 9" },
  { src: "/photos/10.jpg", alt: "Photograph 10" },
];

function ImageWithSkeleton({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
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
        sizes={sizes}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export const Photography = () => {
  return (
    <section id="photography" className="py-24 lg:py-32 relative">
      <div className="container-wide">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">Off-screen</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Through the <span className="text-gradient-primary">viewfinder.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            When I'm not shipping code, I'm chasing light across the Sahyadris with my camera.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3">
          {photos.map((p, i) => (
            <Reveal key={i} delay={i * 50} className={p.span}>
              <div className="group relative w-full h-full rounded-2xl overflow-hidden glass">
                <ImageWithSkeleton
                  src={p.src}
                  alt={p.alt}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
