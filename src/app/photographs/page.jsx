"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

function ImageViewer({ selectedImage, setSelectedImage }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" onClick={() => setSelectedImage(null)}>
            <motion.button
                className="fixed top-5 right-5 bg-white/80 text-black/80 p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </motion.button>
            <motion.div className="h-[32rem] md:h-[50rem]" layoutId={`image-${selectedImage}`}>
                <Image
                    src={`/photos/${selectedImage}.jpg`}
                    alt="Photograph"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        </div>
    );
}

export default function PhotographsPage() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClick = (e) => {
        console.log(e.target.dataset.id);
        setSelectedImage(e.target.dataset.id);
    }

    return (
        <section id="photographs" className="py-5 px-4">
            <div className="container mx-auto mt-[7rem]">
                <h1 className="section-title" data-aos="fade-right">Photographs</h1>
                {
                    selectedImage && <ImageViewer selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                }
                <div>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-7">
                        {
                            new Array(10).fill(0).map((_, index) => (
                                <motion.div key={`image-${index + 1}`} className="bg-gray-200/40 w-full rounded-md overflow-hidden" layoutId={`image-${index + 1}`}>
                                    <div className="w-full h-[8rem] md:h-[14rem] xl:h-[16rem]">
                                        <Image
                                            src={`/photos/${index + 1}.jpg`}
                                            alt="Photograph"
                                            width={500}
                                            height={500}
                                            className="rounded-md object-cover w-full h-full cursor-pointer ease-out transition-all hover:scale-105"
                                            data-id={index + 1}
                                            onClick={handleClick}
                                        />
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}