"use client"
import { useEffect, useState } from "react";
import { IoPartlySunny, IoMoon } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Toggle() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);



    return (
        <div>
            <div className="w-16 h-8 bg-sky-500 dark:bg-yellow-400 bg-opacity-40 rounded-full cursor-pointer p-1 flex justify-start data-[ison=true]:justify-end" data-ison={darkMode} onClick={() => setDarkMode(!darkMode)}>
                <motion.div
                    layout
                    className="w-8 h-6 bg-white dark:bg-black rounded-full flex justify-center items-center"
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}>
                    {
                        darkMode
                            ? <IoMoon className="text-xl text-white" />
                            : <IoPartlySunny className="text-xl text-yellow-400" />
                    }
                </motion.div>

            </div>
        </div>
    );
}