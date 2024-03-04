"use client"

import Image from "next/image";
import { useState } from 'react';

const courses = [
    {
        title: 'Machine Learning Specialization',
        organization: 'Deeplearning.AI',
        path: 'Machine Learning Specialization.jpg',
        platform: 'Coursera'
    },
    {
        title: 'Developing Application with SQL and Django',
        organization: 'IBM Skill Network',
        path: 'Coursera - Django.jpg',
        platform: 'Coursera'
    },
    {
        title: 'Java Fundamentals',
        organization: 'Oracle',
        path: 'Oracle - Java.jpg'
    },
    {
        title: 'Machine Learning Foundation',
        organization: 'iNeuron',
        path: 'iNeuron - ML.png'
    },
];

function Modal(props) {
    return (
        <div className="hidden fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 md:flex justify-center items-center" onClick={() => props.fun(-1)}>
            <div className="modal w-[90%] md:w-[50%] p-5 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white mx-auto">
                        {courses[props.index].title} |
                        <span className='text-yellow-400 ms-2'>{courses[props.index].organization}</span>
                    </h1>
                </div>
                <div className="w-full mt-6">
                    <Image src={`/certificates/${courses[props.index].path}`} alt={courses[props.index].title} width={800} height={500} className="mx-auto shadow-xl" />
                </div>
            </div>
        </div>
    );
}

export default function Courses() {
    const [showModal, setShowModal] = useState(-1);

    return (
        <section id="courses" className="py-5 px-4">
            {showModal !== -1 && <Modal index={showModal} fun={setShowModal} />}
            <div className="container mx-auto mt-[7rem]">
                <h1 className="section-title" data-aos="fade-right">Courses</h1>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {
                            courses.map((course, index) => (
                                <div key={index} data-aos="zoom-in" onClick={() => setShowModal(index)} className="card w-full text-black dark:text-white bg-gray-300 dark:bg-[#282828] p-4 py-6 rounded-lg">
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
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}