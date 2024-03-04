"use client"
import { FaGithub } from "react-icons/fa";

export default function Intro() {
    return (
        <div className="container mx-auto px-4">
            <div className="min-h-screen flex flex-wrap justify-between items-center">

                <div className="px-4 pt-8" data-aos="fade-right">
                    <h1 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white mb-5">Welcome to my portfolio</h1>
                    <h1 className="text-5xl font-bold leading-tight text-gray-950 dark:text-white">
                        <span className="me-2">Hey folks, I`m</span>
                        <div className="animated-role relative text-yellow-400 inline-flex">
                            <span className="text-nowrap">Web Developer</span>
                            <span className="absolute text-nowrap">ML Engineer</span>
                            <span className="absolute text-nowrap">Data Engineer</span>
                        </div>
                    </h1>
                    <p className="text-lg text-gray-950 dark:text-gray-300">Building a successful product is a challenge. I am highly energetic in development.</p>
                    <div className="mt-5 flex items-center gap-5">
                        <a href="/Prathamesh_Chaudhary.pdf" target="_blank" rel="noopener noreferrer" download>
                            <button className="bg-gray-300 hover:dark:bg-black hover:bg-white text-gray-800 hover:text-yellow-400 shadow transition-all px-4 py-2 rounded-xl font-bold">Get My Resume</button>
                        </a>
                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-black dark:bg-white text-white dark:text-black shadow-lg">
                            <a href="https://github.com/pc7122" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaGithub className="text-4xl" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-20 flex-1">
                    <div className="-z-10 absolute top-0 md:left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90% dark:opacity-40 md:dark:opacity-70"></div>
                    <div className="-z-10 absolute bottom-0 right-0 w-60 h-60 rounded-full bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:opacity-70"></div>
                </div>

            </div>
        </div>
    );
}