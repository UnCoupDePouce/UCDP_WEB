import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Pagination from "../components/Pagination.tsx";
import { fetchUsers, updateUser, type UserRecord, type UserUpdatePayload } from "../services/api.ts";

const ITEMS_PER_PAGE = 10;
const ROLES = ["ADMIN", "CLIENT", "PRESTATAIRE"] as const;

const ROLE_BADGE: Record<string, string> = {
    ADMIN: "bg-indigo-900/40 text-indigo-300",
    PRESTATAIRE: "bg-emerald-900/30 text-emerald-400",
    CLIENT: "bg-gray-700 text-gray-300",
};

function formatDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

type EditState = UserUpdatePayload & { id: string };

function EditModal({ user, onClose, onSaved }: {
    user: EditState;
    onClose: () => void;
    onSaved: (updated: UserRecord) => void;
}) {
    const [form, setForm] = useState<UserUpdatePayload>({ ...user });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const setStr = (field: keyof UserUpdatePayload) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            setForm(f => ({ ...f, [field]: e.target.value }));

    const handleSave = async () => {
        setSaving(true);
        setError("");
        try {
            const updated = await updateUser(user.id, form);
            onSaved(updated);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Erreur");
        } finally {
            setSaving(false);
        }
    };

    const inputCls = "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-gray-500";
    const labelCls = "block text-xs font-medium text-gray-400 mb-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto" onClick={onClose}>
            <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-xl my-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-semibold text-base">Modifier l'utilisateur</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-red-400 text-sm">{error}</div>
                )}

                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Prénom</label>
                            <input value={form.prenom} onChange={setStr("prenom")} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Nom</label>
                            <input value={form.nom} onChange={setStr("nom")} className={inputCls} />
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Email</label>
                        <input type="email" value={form.mail} onChange={setStr("mail")} className={inputCls} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Téléphone</label>
                            <input value={form.telephone} onChange={setStr("telephone")} placeholder="0600000000" className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Rôle</label>
                            <select value={form.role} onChange={setStr("role")} className={inputCls}>
                                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Adresse</label>
                        <input value={form.adresse} onChange={setStr("adresse")} className={inputCls} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Code postal</label>
                            <input value={form.code_postal} onChange={setStr("code_postal")} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Ville</label>
                            <input value={form.ville} onChange={setStr("ville")} className={inputCls} />
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Raison sociale</label>
                        <input value={form.raison_sociale} onChange={setStr("raison_sociale")} className={inputCls} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Crédits</label>
                            <input
                                type="number"
                                value={form.credits ?? ""}
                                onChange={e => setForm(f => ({ ...f, credits: e.target.value === "" ? null : Number(e.target.value) }))}
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>ID Entreprise</label>
                            <input
                                value={form.id_entreprise ?? ""}
                                onChange={setStr("id_entreprise")}
                                className={inputCls}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 transition">
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.nom || !form.prenom || !form.mail}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {saving ? "Enregistrement…" : "Enregistrer"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UserCard({ user, onEdit }: { user: UserRecord; onEdit: () => void }) {
    const address = [user.adresse, user.code_postal, user.ville].filter(Boolean).join(", ") || "—";

    return (
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-3">
            {/* Ligne 1 : nom + role + bouton */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{user.prenom} {user.nom}</span>
                    <span className={`text-xs rounded-md px-2 py-0.5 font-semibold ${ROLE_BADGE[user.role] ?? "bg-gray-700 text-gray-300"}`}>
                        {user.role}
                    </span>
                    {user.raison_sociale && (
                        <span className="text-xs text-gray-400 italic">{user.raison_sociale}</span>
                    )}
                </div>
                <button
                    onClick={onEdit}
                    className="shrink-0 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                    Modifier
                </button>
            </div>

            {/* Ligne 2 : email + téléphone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <Field label="Email" value={user.mail} />
                <Field label="Téléphone" value={user.telephone} />
            </div>

            {/* Ligne 3 : adresse + ville */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <Field label="Adresse" value={address} />
                <Field label="Ville" value={user.ville} />
            </div>

            {/* Ligne 4 : crédits + id entreprise + date */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1">
                <Field label="Crédits" value={user.credits?.toString()} />
                <Field label="ID Entreprise" value={user.id_entreprise} />
                <Field label="Créé le" value={formatDate(user.date_creation)} />
                <Field label="ID" value={user.id_utilisateur} />
            </div>
        </div>
    );
}

function Field({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="min-w-0">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</span>
            <p className="text-xs text-gray-300 truncate">{value || "—"}</p>
        </div>
    );
}

export default function Utilisateur() {
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editing, setEditing] = useState<EditState | null>(null);

    useEffect(() => {
        setLoading(true);
        setError("");
        fetchUsers(currentPage, ITEMS_PER_PAGE)
            .then(res => {
                console.log("API Response (fetchUsers):", res);
                if (Array.isArray(res)) {
                    setUsers(res);
                    setTotal(res.length);
                } else {
                    setUsers(res.data || []);
                    setTotal(res.total || 0);
                }
            })
            .catch((e: Error) => {
                console.error("API Error (fetchUsers):", e);
                setError(e.message);
            })
            .finally(() => setLoading(false));
    }, [currentPage]);

    const handleSaved = (updated: UserRecord) => {
        setUsers(prev => (prev || []).map(u => u.id_utilisateur === updated.id_utilisateur ? { ...u, ...updated } : u));
        setEditing(null);
    };

    const openEdit = (user: UserRecord) => setEditing({
        id: user.id_utilisateur,
        nom: user.nom,
        prenom: user.prenom,
        mail: user.mail,
        role: user.role,
        telephone: user.telephone ?? "",
        adresse: user.adresse ?? "",
        code_postal: user.code_postal ?? "",
        ville: user.ville ?? "",
        raison_sociale: user.raison_sociale ?? "",
        credits: user.credits,
        id_entreprise: user.id_entreprise ?? "",
    });

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const paginated = users || [];

    return (
        <div className="px-8 pb-8">
            <div>
                <h1 className="text-[16px] font-semibold text-white">Utilisateurs</h1>
                <p className="mt-2 text-sm text-gray-400">
                    Liste de tous les utilisateurs de l'application
                </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                {loading && (
                    <div className="text-center py-12 text-gray-400 text-sm">Chargement…</div>
                )}
                {error && (
                    <div className="text-center py-12 text-red-400 text-sm">{error}</div>
                )}
                {!loading && !error && paginated.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">Aucun utilisateur trouvé</div>
                )}
                {!loading && !error && paginated.map(user => (
                    <UserCard key={user.id_utilisateur} user={user} onEdit={() => openEdit(user)} />
                ))}
            </div>

            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => { setCurrentPage(p); window.scrollTo(0, 0); }}
                />
            )}

            {editing && (
                <EditModal
                    user={editing}
                    onClose={() => setEditing(null)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}
