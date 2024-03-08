"use client"
import { FaInstagram, FaFacebookSquare, FaGithub, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";




export default function Footer() {
    return (
        <footer className="mt-10 p-2 sm:p-10 md:px-36 text-white bg-gray-800">
            <div>
                <div className="lg:columns-3 space-y-5 lg:space-y-0">
                    <div className="flex lg:justify-center items-center gap-2">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex justify-center items-center">
                            <HiOutlineMail className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Email</h1>
                            <p className="text-base">prathameshchaudhary7122@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex lg:justify-center items-center gap-2">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex justify-center items-center">
                            <FaPhoneAlt className="text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Phone</h1>
                            <p className="text-base">+91 9284240426</p>
                        </div>
                    </div>
                    <div className="flex lg:justify-center items-center gap-2">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex justify-center items-center">
                            <FaLocationDot className="text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Address</h1>
                            <p className="text-base">Pune, Maharashtra, India</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center my-10 py-6 border-t-2">
                    <div>
                        <h1 className="text-2xl font-bold">Portfolio</h1>
                    </div>
                    <div className="flex gap-4 mt-10">
                        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#a81784] text-white">
                            <a href="https://www.instagram.com/pratham__7122/" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaInstagram className="text-2xl" />
                            </a>
                        </div>
                        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-white text-blue-600">
                            <a href="https://www.facebook.com/prathamesh.chaudhary.92/" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaFacebookSquare className="text-2xl" />
                            </a>
                        </div>
                        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-blue-700 text-white">
                            <a href="https://www.linkedin.com/in/prathamesh-chaudhary-3ba554218/" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaLinkedinIn className="text-2xl" />
                            </a>
                        </div>
                        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black text-white">
                            <a href="https://github.com/pc7122" target="_blank" rel="noreferrer" className="text-3xl mx-2">
                                <FaGithub className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}