type PaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, onPageChange }: PaginationProps) {
    const pages = [1, 2, 3, 4, 5];

    return (
        <div className="pt-4 flex justify-center">
            <div className="inline-flex gap-1">
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
            </div>
        </div>
    );
}
