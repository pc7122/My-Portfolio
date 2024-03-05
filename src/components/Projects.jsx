"use client"
import { FaGithub, FaLink } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
    const projects = [
        {
            title: "Emosense",
            description: "Multimodal Emotion Recognition Web App",
            image: "EmoSense.png",
            github: "https://github.com/pc7122/EmoSense",
        },
        {
            title: "Todo App (Django & React)",
            description: "Todo App using Django Rest Framework and React with JWT Authentication",
            image: "Todo App.png",
            github: "https://github.com/pc7122/TodoApp-React-Django",
        },
        {
            title: "Tic Tac Toe",
            description: "An Android app for playing tic tac toe game with Minimax AI algorithm",
            image: "Tic Tac Toe.png",
            github: "https://github.com/pc7122/Tic-Tac-Toe-App",
            demo: "https://github.com/pc7122/Tic-Tac-Toe-App/releases/download/v1.0.0/Tic.Tac.Toe.apk",
        },
        {
            title: "Car Object Detection",
            description: "Car Object Detection using YOLOv5 and OpenCV in Python.",
            image: "Car Object Detection.png",
            github: "https://github.com/pc7122/YOLO-Car-Object-Detection",
        },
    ];

    return (
        <section id="projects" className="py-5 px-4">
            <div className="container mx-auto mt-[7rem]">
                <h1 className="section-title" data-aos="fade-right">Projects</h1>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            projects.map((projects, index) => (
                                <div key={index} className="project-container relative h-fit rounded-lg shadow dark:shadow-white overflow-hidden">
                                    <div className="overlay overflow-hidden absolute bottom-0 left-0 w-full transition-all bg-gradient-to-t from-[#000000] from-20% via-[#000000c0] via-40% to-[#00000050] to-50%">
                                        <div className="flex flex-col justify-center items-center h-full gap-5">
                                            <div className="flex items-center gap-5 h-[60%] md:h-[65%]">
                                                <div className="w-14 h-14 rounded-full flex justify-center items-center bg-white text-black shadow-lg">
                                                    <a href={projects.github} target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                                        <FaGithub className="text-4xl" />
                                                    </a>
                                                </div>
                                                {
                                                    projects.demo &&
                                                    <div className="w-14 h-14 rounded-full flex justify-center items-center bg-white text-black shadow-lg">
                                                        <a href={projects.demo} target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                                            <FaLink className="text-3xl" />
                                                        </a>
                                                    </div>
                                                }
                                            </div>
                                            <div className="h-[40%] md:h-[35%] w-full px-5 overflow-clip">
                                                <h1 className="text-lg font-bold text-white text-">{projects.title}</h1>
                                                <p className="text-base text-white text-justify leading-tight">{projects.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg">
                                        <Image src={`/thumbnails/${projects.image}`} alt={projects.title} width={500} height={400} className="aspect-video" />
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