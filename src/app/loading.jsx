"use client"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex justify-center items-center">
            <div className="w-20 h-20 border-4 border-x-transparent dark:border-x-transparent border-blue-700 dark:border-yellow-400 rounded-full animate-spin"></div>
        </div>
    )
}