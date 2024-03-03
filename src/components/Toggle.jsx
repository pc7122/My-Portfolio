"use client"
import { useEffect, useState } from "react";
import { ImSun } from "react-icons/im";

export default function Toggle(props) {
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
            <div className="text-gray-900 dark:text-white font-bold leading-tight cursor-pointer inline-flex p-2" onClick={() => { setDarkMode(!darkMode) }}>
                <ImSun className="mr-2 text-xl" /> {props.text}
            </div>
        </div>
    );
}