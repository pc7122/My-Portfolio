"use client"
import { FaGithub, FaLink } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "tween", stiffness: 260, damping: 20 }}
            className="project-container relative rounded-lg shadow dark:shadow-white overflow-hidden"
        >
            <div className="overlay overflow-hidden absolute bottom-0 left-0 w-full transition-all bg-gradient-to-t from-[#000000] from-20% via-[#000000c0] via-40% to-[#00000050] to-50%">
                <div className="flex flex-col justify-center items-center h-full gap-5">
                    <div className="flex items-center gap-5 h-[60%] lg:h-[65%]">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            className="w-14 h-14 rounded-full flex justify-center items-center bg-white text-black shadow-lg"
                        >
                            <a href={project.github} target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaGithub className="text-4xl" />
                            </a>
                        </motion.div>
                        {
                            project.demo &&
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.7 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="w-14 h-14 rounded-full flex justify-center items-center bg-white text-black shadow-lg"
                            >
                                <a href={project.demo} target="_blank" rel="noreferrer" className="text-3xl mx-2" download>
                                    <FaLink className="text-3xl" />
                                </a>
                            </motion.div>
                        }
                    </div>
                    <div className="h-[40%] lg:h-[35%] w-full px-5 overflow-clip">
                        <h1 className="text-lg font-bold text-white text-">{project.title}</h1>
                        <p className="text-base text-white text-justify leading-tight">{project.description}</p>
                    </div>
                </div>
            </div>
            <div className="rounded-lg">
                <Image src={`/thumbnails/${project.image}`} alt={project.title} width={800} height={700} className="aspect-video mx-auto" />
            </div>
        </motion.div>
    )
}