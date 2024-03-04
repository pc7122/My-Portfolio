"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Courses from '@/components/Courses';

export default function Home() {
    useEffect(() => {
        AOS.init();
    });

    return (
        <div>
            <Courses />
        </div>
    );
}