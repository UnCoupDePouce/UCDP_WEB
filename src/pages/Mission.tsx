export default function Mission(){
    return(
        <div className="px-8" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="opacity-75 border-white/20 border-dashed border rounded-xl overflow-hidden relative h-full">
                <svg
                    fill="none"
                    className="absolute inset-0 h-full w-full stroke-white/10"
                >
                    <defs>
                        <pattern
                            id="pattern-bg"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern-bg)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Zone de contenu</h2>
                        <p className="text-gray-400">Glissez-déposez vos fichiers ici</p>
                    </div>
                </div>
            </div>
        </div>
    )
}