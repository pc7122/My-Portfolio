"use client"
import Image from "next/image";
import Timeline from "@/components/Timeline";

export default function About() {
    const experience = [
        {
            title: "Data Analyst - Intern",
            organization: "NoQs Digital",
            date: "Jul 2023 - Sep 2023",
            desc: [
                "Leveraged the capabilities of Google Sheets to craft dashboards, demonstrating a hands-on approach to proficiency.",
                "Spearheaded data analysis and automation initiatives, resulting in a 40% reduction in manual data processing time.",
                "Applied robust analytical acumen to transform raw data into actionable insights, uncovering nuanced trends, and key insights."
            ]
        },
        {
            title: "Data Science - Intern",
            organization: "Ahen Pvt. Ltd.",
            date: "Jan 2023 - Feb 2023",
            desc: [
                "Implemented advanced web scraping techniques to collect and analyze data from Google Maps, focusing on user ratings and feedback for driving schools.",
                "Derived key insights from the analyzed information, contributing to the optimization of marketing campaigns and improvement of customer satisfaction metrics.",
            ]
        },
        {
            title: "PHP Developer - Trainee",
            organization: "R. B. Tech Services",
            date: "Jul 2020 - Aug 2020",
            desc: [
                "Conceptualized, designed, and implemented a user-friendly notice management system using PHP, SQL, and JavaScript.",
                "Contributed to database management (SQL) and responsive design (Bootstrap), showcasing adaptability to various technologies.",
                "Demonstrated a diverse skill set in web development, ensuring seamless posting, viewing, and management of notices."
            ]
        }
    ];

    const education = [
        {
            title: "Bachelor's Degree",
            major: "Artificial Intelligence",
            organization: "AISSMS Institute of Information Technology",
            date: "2021 - 2024",
        },
        {
            title: "Diploma",
            major: "Computer Engineering",
            organization: "Government Polytechnic",
            date: "2018 - 2021",
        },
        {
            title: "SSC",
            organization: "B. N. Sarda Vidyalaya",
            date: "2017 - 2018",
        }
    ];

    return (
        <section id="about" className="py-5 px-4">
            <div className="container mx-auto">
                <h1 className="section-title" data-aos="fade-right">About</h1>
                <p className="section-desc">A team-oriented AI engineer with problem-solving skills and project-specific knowledge. Passionate about coding, web design, and handling real-world data. Experienced in web development as well.</p>

                <div className="grid lg:flex gap-10 justify-center my-5 text-white">
                    <div>
                        <div className="relative w-fit mx-auto" data-aos="zoom-in">
                            <div className="circle absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg"></div>
                            <div className="circle absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tr from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg"></div>
                            <div className="p-2 bg-gray-600 dark:bg-slate-50 rounded-lg bg-opacity-20 dark:bg-opacity-10 shadow-lg backdrop-blur">
                                <Image src="/profile.jpg" alt="Profile" width={350} height={350} className="mx-auto min-w-80 rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className="grow" data-aos="fade-right">
                        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">Prathamesh Chaudhary</h2>
                        <div className="w-full h-1 bg-gray-950 dark:bg-white mb-4"></div>

                        <div className="space-y-2">
                            <span className="text-xl sm:text-2xl font-bold text-black dark:text-white">Web Developer & AIML Enthusiast</span>
                            <div className="text-gray-950 dark:text-gray-200">
                                <div className="xl:columns-2 text-base sm:text-lg">
                                    <div><strong>Date of Birth:</strong> 07/12/2002</div>
                                    <div><strong>Phone no:</strong> +91 9284240426</div>
                                </div>
                                <div className="xl:columns-2 text-base sm:text-lg">
                                    <div><strong>City:</strong> Pune, Maharashtra</div>
                                    <div><strong>Email:</strong> prathameshchaudhary7122@gmail.com</div>
                                </div>
                            </div>
                            <div className="text-base sm:text-lg text-justify text-gray-950 dark:text-gray-200 mt-4 space-y-6">
                                <p className="leading-normal tracking-normal">As a web developer, I have extensive experience in designing, developing and maintaining websites and web applications. I have a strong understanding of HTML, CSS, JavaScript and various front-end frameworks such as React and Angular. I have also worked with various back-end technologies such as Node.js, PHP and Ruby on Rails to build dynamic and responsive websites. I have a good understanding of database systems such as MySQL, MongoDB and have experience in integrating databases with web applications. I have experience with version control systems such as Git and have collaborated on several projects using Git.</p>
                                <p className="leading-normal tracking-normal">I am a quick learner and highly motivated to apply my knowledge and skills to tackle complex problems. I am always eager to learn and grow as a professional developer.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:columns-2 gap-10 mt-10 px-6">
                    <div className="column mb-5">
                        <h1 className="title" data-aos="zoom-in">Experience</h1>
                        <div>
                            {experience.map((exp, index) => (
                                <Timeline key={index} data={exp} />
                            ))}
                        </div>
                    </div>

                    <div className="column mb-5">
                        <h1 className="title" data-aos="zoom-in">Education</h1>
                        <div>
                            {education.map((edu, index) => (
                                <Timeline key={index} data={edu} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}