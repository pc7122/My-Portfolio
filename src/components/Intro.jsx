"use client"
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Intro() {
    return (
        <div className="container mx-auto px-4">
            <div className="min-h-screen flex flex-wrap justify-between items-center">

                <div className="px-4 pt-8" data-aos="fade-right">
                    <h1 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white mb-5">Welcome to my portfolio</h1>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        <span className="me-2 text-gray-950 dark:text-white">Hey folks, I`m</span>
                        <div className="animated-role relative inline-flex">
                            <span className="text-nowrap">Web Developer</span>
                            <span className="absolute text-nowrap">Python Developer</span>
                            <span className="absolute text-nowrap">AI Enthusiast</span>
                        </div>
                    </h1>
                    <p className="text-lg text-gray-950 dark:text-gray-300 mt-3">Building a successful product is a challenge. I am highly energetic in development.</p>
                    <div className="mt-5 flex items-center gap-8">
                        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} href="/Prathamesh_Chaudhary.pdf" target="_blank" rel="noopener noreferrer" download>
                            <button className="bg-gray-300 text-gray-800 shadow transition-all px-4 py-2 rounded-xl font-bold">
                                Get My Resume
                            </button>
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.7 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="w-10 h-10 rounded-full flex justify-center items-center bg-black dark:bg-white text-white dark:text-black shadow-lg">
                            <a href="https://github.com/pc7122" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaGithub className="text-4xl" />
                            </a>
                        </motion.div>
                    </div>
                </div>

                <div className="relative min-h-20 flex-1">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="-z-10 absolute top-0 md:left-1/3 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90% dark:opacity-40 md:dark:opacity-70"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="-z-10 absolute bottom-0 right-0 w-60 h-60 rounded-full bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% dark:opacity-70"
                    />
                </div>

            </div>
        </div>
    );
}