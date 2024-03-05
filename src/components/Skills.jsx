"use client"
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";

export default function Skills() {
    const skills = {
        programming: [
            { name: "Python", level: "80%" },
            { name: "Java", level: "60%" },
            { name: "Javascript", level: "60%" },
        ],
        web: [
            { name: "HTML/CSS", level: "80%" },
            { name: "Bootstrap", level: "60%" },
            { name: "Tailwind CSS", level: "60%" },
            { name: "React js", level: "70%" },
            { name: "Next.js", level: "50%" },
            { name: "Flask", level: "70%" },
            { name: "Django", level: "70%" },
            { name: "PHP", level: "70%" },
        ],
    }

    const alsoKnown = [
        { name: "jQuery", path: "jquery-icon.png" },
        { name: "Tailwind", path: "tailwindcss-icon.svg" },
        { name: "NextJS", path: "nextjs-icon.png" },
        { name: "MySQL", path: "mysql-icon.svg" },
        { name: "MongoDB", path: "mongodb-icon.svg" },
        { name: "Tensorflow", path: "tensorflow-icon.svg" },
        { name: "OpenCV", path: "opencv-icon.svg" },
        { name: "Git", path: "git-icon.svg" },
    ]

    return (
        <section id="skills" className="py-5 px-4">
            <div className="container mx-auto">
                <h1 className="section-title">Skills</h1>

                <div>
                    <h2 className="section-subtitle">Programming Languages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                        {
                            skills.programming.map((skill, index) => (
                                <ProgressBar key={index} title={skill.name} level={skill.level} />
                            ))
                        }
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="section-subtitle">Web Technologies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                        {
                            skills.web.map((skill, index) => (
                                <ProgressBar key={index} title={skill.name} level={skill.level} />
                            ))
                        }
                    </div>
                </div>

                <div className="mt-20 md:mt-40">
                    <h3 className="flex justify-center items-center gap-2 text-xl font-semibold text-gray-950 dark:text-white mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11h-3.94a.78.78 0 0 0-.21 0h-.17a1.3 1.3 0 0 0-.15.1a1.67 1.67 0 0 0-.16.12a1 1 0 0 0-.09.13a1.32 1.32 0 0 0-.12.2l-1.6 4.41l-4.17-11.3a1 1 0 0 0-1.88 0L6.2 11H3a1 1 0 0 0 0 2h4.3a.86.86 0 0 0 .16-.1a1.67 1.67 0 0 0 .16-.12l.09-.13a1 1 0 0 0 .12-.2l1.62-4.53l4.16 11.42a1 1 0 0 0 .94.66a1 1 0 0 0 .94-.66l2.3-6.34H21a1 1 0 0 0 0-2" className="text-yellow-400" /></svg>
                        Also Known
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 11h-3.94a.78.78 0 0 0-.21 0h-.17a1.3 1.3 0 0 0-.15.1a1.67 1.67 0 0 0-.16.12a1 1 0 0 0-.09.13a1.32 1.32 0 0 0-.12.2l-1.6 4.41l-4.17-11.3a1 1 0 0 0-1.88 0L6.2 11H3a1 1 0 0 0 0 2h4.3a.86.86 0 0 0 .16-.1a1.67 1.67 0 0 0 .16-.12l.09-.13a1 1 0 0 0 .12-.2l1.62-4.53l4.16 11.42a1 1 0 0 0 .94.66a1 1 0 0 0 .94-.66l2.3-6.34H21a1 1 0 0 0 0-2" className="text-yellow-400" /></svg>
                    </h3>

                    <div className="flex flex-wrap justify-center items-center gap-8 mt-5 p-5">
                        {
                            alsoKnown.map((icon, index) => (
                                <div key={index}>
                                    <div data-aos="zoom-in">
                                        <Image key={index} src={`/icons/${icon.path}`} alt={icon.name} width={50} height={50} className="mx-auto" />
                                        <span className="block text-black dark:text-white text-sm font-semibold mt-2 text-center">{icon.name}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}