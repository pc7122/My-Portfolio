"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Projects from "@/components/Projects";

export default function Page() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div>
            <Projects />
        </div>
    );
}