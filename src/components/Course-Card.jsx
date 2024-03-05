"use client"
import Image from "next/image";

export default function CourseCard({ id, course, onClick }) {
    return (
        <div data-aos="zoom-in" onClick={onClick} className="card w-full text-black dark:text-white bg-gray-300 dark:bg-[#282828] p-4 py-6 rounded-lg">
            <div className="card-body">
                <h2 className="text-lg font-semibold mb-5 min-h-14">{course.title}</h2>
                <div className="w-full">
                    <Image src={`/certificates/${course.path}`} alt={course.title} width={400} height={200} className="mx-auto" />
                </div>
                <p className="text-lg text-center font-bold mt-5">
                    {course.organization}
                    {course.platform && <span className="text-lg ms-2">| {course.platform}</span>}
                </p>
            </div>
        </div>
    )
}