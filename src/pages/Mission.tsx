import {missionData} from "../data/mock.ts";
import {useState} from "react";
import Pagination from "../components/Pagination.tsx";

export default function Mission() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="col-start-3 row-start-1 max-2xl:col-span-full max-2xl:col-start-1">
            <div className="px-8" style={{height: 'calc(100vh - 80px)'}}>
                <div className="overflow-hidden relative h-full">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[16px] font-semibold text-white">Missions</h1>
                            <p className="mt-2 text-sm text-gray-400">
                                Liste de toutes les missions crées jusqu'à aujourd'hui
                            </p>
                        </div>
                    </div>

                    <ul role="list" className="divide-y divide-white/5 rounded-md bg-gray-800 px-4 mt-8">
                        {missionData.map((item) => (
                            <li key={item.id} className="relative flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-sm font-semibold text-white">
                                                {item.name}
                                            </p>
                                            <p className={`text-[11px] rounded-lg px-2 py-[1px] font-semibold inset-ring ${item.status == "En cours" ? "bg-yellow-900/20 text-yellow-400" : "bg-emerald-900/20 text-green-400"}`}>
                                                {item.status}
                                            </p>
                                        </div>
                                        <p className="mt-1 truncate text-xs text-gray-400">
                                            {item.author} — {item.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end relative">
                                    <button
                                        className="p-2 hover:bg-gray-700 rounded-lg transition cursor-pointer"
                                    >
                                        <span className="mt-1 text-xs text-gray-400 hidden">Open options</span>
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="w-5 h-5 text-white"
                                        >
                                            <path
                                                d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Pagination currentPage={currentPage}
                            onPageChange={setCurrentPage}/>
            </div>
        </div>
    );
}