import { useEffect, useState } from "react";
import Pagination from "../components/Pagination.tsx";
import { fetchMissions, type MissionRecord } from "../services/api.ts";

const ITEMS_PER_PAGE = 10;

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatPrice(prix: number) {
    if (!prix) return "—";
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(prix);
}

export default function Mission() {
    const [missions, setMissions] = useState<MissionRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMissions()
            .then(setMissions)
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(missions.length / ITEMS_PER_PAGE);
    const paginated = missions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="px-8 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[16px] font-semibold text-white">Missions</h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Liste de toutes les missions créées jusqu'à aujourd'hui
                    </p>
                </div>
                {!loading && !error && (
                    <span className="text-sm text-gray-400">{missions.length} mission{missions.length !== 1 ? "s" : ""}</span>
                )}
            </div>

            <div className="mt-8">
                {loading ? (
                    <div className="text-center py-12 text-gray-400 text-sm">Chargement…</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-400 text-sm">{error}</div>
                ) : paginated.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm">Aucune mission trouvée</div>
                ) : (
                    <ul role="list" className="divide-y divide-white/5 rounded-md bg-gray-800 px-4">
                        {paginated.map((item) => {
                            const clientName = item.utilisateur
                                ? (item.utilisateur.raison_sociale ?? `${item.utilisateur.prenom} ${item.utilisateur.nom}`)
                                : "—";

                            return (
                                <li key={item.id_offre} className="relative flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <p className="text-sm font-semibold text-white">{item.titre}</p>
                                                <span className={`text-[11px] rounded-lg px-2 py-[1px] font-semibold ${item.statut ? "bg-gray-700/60 text-gray-400" : "bg-yellow-900/20 text-yellow-400"}`}>
                                                    {item.statut ? "Fermée" : "En cours"}
                                                </span>
                                                {item.metier && (
                                                    <span className="text-[11px] rounded-lg px-2 py-[1px] font-semibold bg-indigo-900/30 text-indigo-300">
                                                        {item.metier.nom}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {clientName}
                                                {item.utilisateur?.mail ? ` — ${item.utilisateur.mail}` : ""}
                                            </p>
                                            <p className="mt-0.5 text-xs text-gray-500">{item.localisation}</p>
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex flex-col items-end gap-1">
                                        <p className="text-sm font-semibold text-white">{formatPrice(item.prix)}</p>
                                        <p className="text-xs text-gray-400">{formatDate(item.date_offre)}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }}
                />
            )}
        </div>
    );
}
