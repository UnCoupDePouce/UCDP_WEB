const API_URL = 'https://ucdp-backend.onrender.com';

function authHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? {Authorization: `Bearer ${token}`} : {};
}

export type AuthResponse = {
    token: string;
    user: {
        id_utilisateur: number;
        nom: string;
        prenom: string;
        mail: string;
        role: string;
    };
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    });
    const data = await res.json() as { message?: string } & Partial<AuthResponse>;
    if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
    return data as AuthResponse;
}

export type LogEntry = {
    id: string;
    message: string;
    stack: string | null;
    route: string | null;
    method: string | null;
    date: string;
};

export type LogsResponse = {
    total: number;
    page: number;
    limit: number;
    data: LogEntry[];
};

export type UserRecord = {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string | null;
    adresse: string | null;
    code_postal: string | null;
    ville: string | null;
    raison_sociale: string | null;
    credits: number | null;
    role: string;
    date_creation: string | null;
    id_entreprise: number | null;
};

export type UserUpdatePayload = {
    nom: string;
    prenom: string;
    mail: string;
    role: string;
    telephone: string;
    adresse: string;
    code_postal: string;
    ville: string;
    raison_sociale: string;
    credits: number | null;
    id_entreprise: number | null;
};

export async function updateUser(id: number, payload: UserUpdatePayload): Promise<UserRecord> {
    const res = await fetch(`${API_URL}/api/user/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', ...authHeaders() as Record<string, string>},
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<UserRecord>;
}

export type UsersResponse = {
    data: UserRecord[];
    total: number;
    page: number;
    limit: number;
};

export async function fetchUsers(page = 1, limit = 10): Promise<UsersResponse> {
    const url = new URL(`${API_URL}/api/user`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(limit));
    const res = await fetch(url.toString(), {headers: authHeaders()});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<UsersResponse>;
}

export type MissionRecord = {
    id_offre: number;
    titre: string;
    description: string;
    localisation: string;
    prix: number;
    statut: boolean;
    date_offre: string | null;
    utilisateur: {
        id_utilisateur: number;
        nom: string;
        prenom: string;
        mail: string;
        raison_sociale: string | null;
    } | null;
    metier: { id_metier: number; nom: string } | null;
};

export async function fetchMissions(): Promise<MissionRecord[]> {
    const res = await fetch(`${API_URL}/api/offre`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<MissionRecord[]>;
}

export async function fetchLogs(params: Record<string, string> = {}): Promise<LogsResponse> {
    // eslint-disable-next-line no-useless-catch
    try {
        const url = new URL(`${API_URL}/api/logs`);
        Object.entries(params).forEach(([k, v]) => {
            if (v) url.searchParams.set(k, v);
        });

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        return data as LogsResponse;

    } catch (error) {
        throw error;
    }
}
