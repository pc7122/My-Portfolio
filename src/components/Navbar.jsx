'use client'
import { useState } from 'react';
import Link from 'next/link';
import Toggle from './Toggle.jsx';

export default function Header() {
    const [showNav, setShowNav] = useState(false);

    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '#' },
        { name: 'Courses', link: '/courses' },
        { name: 'Projects', link: '/projects' }
    ];

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-black z-10">
            <div className="container mx-auto p-4 pt-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold leading-tight text-yellow-400">My Port<span className="text-gray-900 dark:text-white">folio</span></h1>
                    </div>

                    <nav className={`absolute md:static left-0 top-[6rem] md:top-0 w-full md:w-fit flex justify-center bg-white dark:bg-black transition-all md:translate-y-0 md:scale-y-100 ${showNav ? 'translate-y-0 scale-y-100' : '-translate-y-1/2 scale-y-0'}`} >
                        <ul className="flex md:flex-row flex-col text-center gap-4 md:gap-8 leading-normal pb-10 md:pb-0">
                            {navItems.map((item, index) => (
                                <li key={index} className="overflow-hidden">
                                    <Link href={item.link} className="dark:text-gray-300 text-base font-bold">
                                        <span
                                            data-hover={item.name}
                                            className="relative transition-all inline-block before:content-[attr(data-hover)] before:text-yellow-400 before:absolute before:top-full hover:-translate-y-full">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
                        <Toggle text="Color Mode" />
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