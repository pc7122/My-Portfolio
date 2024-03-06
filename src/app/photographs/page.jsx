"use client"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function ImageViewer({ selectedImage, setSelectedImage }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50" onClick={() => setSelectedImage(null)}>
            <motion.div className="h-[50rem]" layoutId={`image-${selectedImage}`}>
                <Image
                    src={`/photos/${selectedImage}.jpg`}
                    alt="Photograph"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                    unoptimized={true}
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
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-7">
                        {
                            new Array(4).fill(0).map((_, index) => (
                                <motion.div key={`image-${index + 1}`} className="bg-gray-200 w-full rounded-md overflow-hidden" layoutId={`image-${index + 1}`}>
                                    <div className="w-full h-[8rem] md:h-[14rem] lg:h-[22rem]">
                                        <Image
                                            src={`/photos/${index + 1}.jpg`}
                                            alt="Photograph"
                                            width={500}
                                            height={500}
                                            className="rounded-md object-cover w-full h-full cursor-pointer ease-out transition-all hover:scale-105"
                                            data-id={index + 1}
                                            onClick={handleClick}
                                            placeholder="blur"
                                            blurDataURL={`/photos/${index + 1}.jpg?lqip`}
                                            unoptimized={true}
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