"use client"
import Image from "next/image";
import { IoClose } from "react-icons/io5";

export default function CourseModal({ course, onClose }) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="modal w-[90%] md:w-[60%] p-5 rounded-lg" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        {course.title} |
                        <span className='text-yellow-400 ms-2'>{course.organization}</span>
                    </h1>
                    <button className="float-right" onClick={onClose}>
                        <IoClose className="text-3xl text-white cursor-pointer" onClick={onClose} />
                    </button>
                </div>
                <div className="w-full mt-6">
                    <Image src={`/certificates/${course.path}`} alt={course.title} width={800} height={500} className="mx-auto shadow-xl" />
                </div>
            </div>
        </div>
    );
}
