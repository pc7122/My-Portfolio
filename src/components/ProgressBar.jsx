export default function ProgressBar({ title, level }) {
    return (
        <div className="column text-black dark:text-white md:mt-10">
            <div data-aos="fade-up">
                <div className="text-base font-bold uppercase">
                    {title}
                    <span className="float-right">{level}</span>
                </div>
                <div className="mt-2">
                    <div className="w-full h-[10px] bg-slate-300 rounded-lg overflow-hidden" role="progressbar" aria-valuenow={60}>
                        <div className="bg-blue-700 dark:bg-yellow-400 h-full" style={{ width: level }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}