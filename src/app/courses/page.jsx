"use client"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import CourseCard from '@/components/Course-Card';
import CourseModal from '@/components/Course-Modal';

export default function Page() {
    const [showModal, setShowModal] = useState(null);
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

    useEffect(() => {
        AOS.init();
    });

    return (
        <section id="courses" className="py-5 px-4">
            {showModal !== null && <CourseModal course={courses[showModal]} onClose={() => setShowModal(null)} />}
            <div className="container mx-auto mt-[7rem]">
                <h1 className="section-title" data-aos="fade-right">Courses</h1>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {
                            courses.map((course, index) => (
                                <CourseCard key={index} course={course} onClick={() => setShowModal(index)} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}