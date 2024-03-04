"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Intro from '@/components/Intro';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div>
      <Intro />
      <About />
      <Skills />
      <Footer />
    </div>
  );
}