"use client"
import Image from "next/image";

export default function CourseModal({ course, onClose }) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50 hidden md:flex justify-center items-center" onClick={onClose}>
            <div className="modal w-[95%] lg:w-[80%] xl:w-[55%] p-5 rounded-lg">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-white">
                        {course.title} |
                        <span className='text-yellow-400 ms-2'>{course.organization}</span>
                    </h1>
                </div>
                <div className="w-full mt-6">
                    <Image src={`/certificates/${course.path}`} alt={course.title} width={1000} height={600} className="mx-auto shadow-xl object-cover" onClick={e => e.stopPropagation()} />
                </div>
            </div>
        </div>
    );
}
