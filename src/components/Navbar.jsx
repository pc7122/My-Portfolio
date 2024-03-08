'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { stagger, useAnimate } from 'framer-motion';
import Toggle from './Toggle.jsx';
import useWindowSize from './useWindowSize.jsx';

export default function Header() {
    const [showNav, setShowNav] = useState(false);
    const [scope, animate] = useAnimate();
    const { width } = useWindowSize();


    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Courses', link: '/courses' },
        { name: 'Projects', link: '/projects' },
        { name: 'Photography', link: '/photographs' },
    ];

    useEffect(() => {
        if (width > 768) setShowNav(true);
        else setShowNav(false);
    }, [width]);

    useEffect(() => {
        animate("nav", {
            clipPath: showNav ? "circle(200% at top 0 right 50%)" : "circle(0% at top 0 right 50%)",
        }, {
            duration: 0.5,
            transition: { type: "spring", stiffness: 400, damping: 40 }
        });

        animate("li",
            showNav
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 },
            {
                duration: 0.2,
                delay: showNav ? stagger(0.1, { startDelay: 0.15 }) : 0,
            });

    }, [showNav, animate]);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    return (
        <header ref={scope} className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-black z-10">
            <div className="lg:container mx-auto p-4 pt-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br blue-shade dark:yellow-shade">
                            My Port<span className='text-gray-950 dark:text-white'>folio</span>
                        </h1>
                    </div>

                    <nav className="absolute md:static left-0 top-[5rem] md:top-0 w-full md:w-fit flex justify-center bg-white dark:bg-black shadow md:shadow-none">
                        <ul className="flex md:flex-row flex-col text-center gap-6 md:gap-8 leading-normal py-6 md:py-0">
                            {navItems.map((item, index) => (
                                <li key={index} className="overflow-hidden">
                                    <Link href={item.link} className="text-gray-950 dark:text-gray-300 text-base font-bold">
                                        <span
                                            data-hover={item.name}
                                            className="relative transition-all inline-block before:content-[attr(data-hover)] before:text-blue-700 dark:before:text-yellow-400 before:absolute before:top-full hover:-translate-y-full">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
                        <Toggle />
                        <button type="button" onClick={toggleNav} className="grid items-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className={`w-full h-1 bg-black dark:bg-gray-100 block rounded transition-all ${showNav ? 'translate-y-2 rotate-45' : ''}`}></span>
                            <span className={`h-1 bg-black dark:bg-gray-100 block rounded transition-all ${showNav ? 'w-0' : 'w-full'}`}></span>
                            <span className={`w-full h-1 bg-black dark:bg-gray-100 block rounded transition-all ${showNav ? '-translate-y-2 -rotate-45' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}