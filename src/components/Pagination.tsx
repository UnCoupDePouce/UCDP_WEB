type PaginationProps = {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages = 5, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pt-4 flex justify-center">
            <div className="inline-flex gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ‹
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-md text-sm font-semibold
                            ${currentPage === page
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-white/5"
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
