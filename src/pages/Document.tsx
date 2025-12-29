import {useState} from 'react';
import {ChevronLeft, ChevronRight, FileText} from 'lucide-react';
import {documents} from "../data/mock.ts";

export default function Document() {
    const [currentPage, setCurrentPage] = useState(0);

    const docsPerPage = 3;
    const totalPages = Math.ceil(documents.length / docsPerPage);
    const currentDocs = documents.slice(currentPage * docsPerPage, (currentPage + 1) * docsPerPage);

    return (
        <div className="min-h-screen bg-gray-950 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Documents</h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Liste de tous les documents
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-6 auto-rows-[400px]">
                    <div
                        className="col-span-3 row-span-3 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
                        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
                            <div className="text-center">
                                <FileText className="w-24 h-24 text-gray-600 mx-auto mb-4"/>
                                <p className="text-gray-400 text-lg">Aperçu du document</p>
                                <p className="text-gray-500 text-sm mt-2">{documents[currentPage * docsPerPage]?.name || 'Aucun document'}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="col-span-1 row-span-3 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
                        <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
                            <h2 className="text-sm font-semibold text-white">Documents</h2>
                        </div>

                        {/* Liste scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="divide-y divide-gray-700">
                                {currentDocs.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="px-4 py-3 hover:bg-gray-700 transition cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <FileText className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0"/>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-white truncate">
                                                    {doc.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {doc.size} • {doc.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer avec pagination */}
                        <div className="bg-gray-900 border-t border-gray-700 p-3 flex items-center justify-between">
                            <button
                                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                                className="p-1.5 hover:bg-gray-800 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4 text-white"/>
                            </button>

                            <span className="text-xs text-gray-500">
                {currentPage + 1} / {totalPages}
              </span>

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="p-1.5 hover:bg-gray-800 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4 text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}