"use client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProjectCard from "@/components/Project-Card";

export default function ProjectsPage() {
    useEffect(() => {
        AOS.init();
    }, []);

    const projects = [
        {
            title: "Emosense",
            description: "Multimodal Emotion Recognition Web App",
            image: "Emosense.png",
            github: "https://github.com/pc7122/EmoSense",
        },
        {
            title: "Plant Disease Detection",
            description: "Plant Disease Detection using CNN and FastAPI in Python",
            image: "Plant.png",
            github: "https://github.com/pc7122/Plant-Disease-Detection",
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
        {
            title: "MyShows",
            description: "Movie Ticket Booking Website using PHP and MySQL.",
            image: "MyShows.png",
            github: "https://github.com/pc7122/MyShows",
        },
    ];

    return (
        <section id="projects" className="py-5 px-4">
            <div className="container mx-auto mt-[7rem]">
                <h1 className="section-title" data-aos="fade-right">Projects</h1>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                        {
                            projects.map((projects, index) => (
                                <ProjectCard key={index} project={projects} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}