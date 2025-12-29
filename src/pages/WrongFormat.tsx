export default function WrongFormat() {
    return (
        <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50 px-8">
            <div className="border-white/20 border-dashed border rounded-xl overflow-hidden relative w-full h-full max-w-4xl max-h-96">
                <svg fill="none" className="opacity-50 absolute inset-0 h-full w-full stroke-white/10">
                    <defs>
                        <pattern id="pattern-bg" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern-bg)"></rect>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                            Format horizontal requis
                        </h1>
                        <p className="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
                            Cette application est disponible uniquement en format paysage (horizontal) sur ordinateur de bureau.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}