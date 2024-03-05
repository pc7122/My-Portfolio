"use client"

export default function Timeline({ data }) {
    return (
        <div className="timeline relative before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-gray-600 before:-translate-x-1/2">
            <div className="p-5 pr-0 m-0">
                <div className="absolute top-0 left-0 w-8 h-8 border-2 border-gray-600 bg-white dark:bg-black rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-950 dark:text-white" data-aos="fade-right">
                        {data.title}
                        {data.major && <span className="block md:inline"> ({data.major})</span>}
                    </h3>
                    <h4 className="text-lg font-bold" data-aos="fade-right">{data.organization}</h4>
                    <p className="bg-gray-950 dark:bg-white rounded text-white dark:text-black font-bold px-1 w-fit">{data.date}</p>
                    <ul className="text-justify text-black dark:text-white  list-disc ml-5" data-aos="zoom-in">
                        {data.desc && data.desc.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}