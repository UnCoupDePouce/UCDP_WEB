import { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, Clock, MapPin, Activity, ChevronDown, ChevronRight } from 'lucide-react';
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { fetchLogs, type LogEntry } from '../services/api';

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-700',
  POST: 'bg-green-100 text-green-700',
  PUT: 'bg-yellow-100 text-yellow-700',
  PATCH: 'bg-orange-100 text-orange-700',
  DELETE: 'bg-red-100 text-red-700',
};

function MethodBadge({ method }: { method: string | null }) {
  const m = method ?? 'N/A';
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${METHOD_COLORS[m] ?? 'bg-gray-100 text-gray-600'}`}>
      {m}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`rounded-[12px] p-3 ${color} shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-xl font-bold text-[#2b2b2b] truncate">{value}</p>
      </div>
    </div>
  );
}

const TOOLTIP_STYLE = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  color: '#1a202c',
};

const LIMIT = 10;
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [page, setPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    fetchLogs({ limit: '200', sort: 'desc' })
      .then(res => setLogs(res.data))
      .catch(e => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const last24h = logs.filter(l => now - new Date(l.date).getTime() < 86_400_000).length;

    const routeCounts = logs.reduce<Record<string, number>>((acc, l) => {
      const r = l.route ?? 'N/A';
      acc[r] = (acc[r] ?? 0) + 1;
      return acc;
    }, {});

    const topRoute = Object.entries(routeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

    const topRoutes = Object.entries(routeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([route, count]) => ({ route, count }));

    const methodCounts = logs.reduce<Record<string, number>>((acc, l) => {
      const m = l.method ?? 'N/A';
      acc[m] = (acc[m] ?? 0) + 1;
      return acc;
    }, {});
    const methodData = Object.entries(methodCounts).map(([method, count]) => ({ method, count }));

    const byDay = logs.reduce<Record<string, number>>((acc, l) => {
      const day = l.date.slice(0, 10);
      acc[day] = (acc[day] ?? 0) + 1;
      return acc;
    }, {});
    const timelineData = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, count]) => ({ date: date.slice(5), count }));

    return { last24h, topRoute, topRoutes, methodData, timelineData };
  }, [logs]);

  const filtered = useMemo(() => {
    return logs.filter(l => {
      if (methodFilter && l.method !== methodFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!l.message?.toLowerCase().includes(s) && !l.route?.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [logs, methodFilter, search]);

  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  const totalPages = Math.ceil(filtered.length / LIMIT);

  if (loading) {
    return (
      <div className="px-8 py-8 flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Chargement des logs...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-[16px] p-6 text-red-600 text-sm">
          Impossible de récupérer les logs : <span className="font-mono">{fetchError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total erreurs" value={logs.length} icon={AlertTriangle} color="bg-red-500" />
        <StatCard title="Dernières 24h" value={stats.last24h} icon={Clock} color="bg-orange-400" />
        <StatCard title="Route la + touchée" value={stats.topRoute} icon={MapPin} color="bg-yellow-500" />
        <StatCard title="Méthodes distinctes" value={stats.methodData.length} icon={Activity} color="bg-teal-500" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Timeline */}
        <div className="xl:col-span-8 bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col h-[280px]">
          <h3 className="text-base font-bold text-[#2b2b2b] mb-4">Erreurs par jour (14 derniers jours)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="count" name="Erreurs" stroke="#ef4444" fillOpacity={1} fill="url(#colorErrors)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Method breakdown */}
        <div className="xl:col-span-4 bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col h-[280px]">
          <h3 className="text-base font-bold text-[#2b2b2b] mb-4">Par méthode HTTP</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.methodData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="method" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" name="Erreurs" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top routes chart */}
      {stats.topRoutes.length > 0 && (
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col h-[240px]">
          <h3 className="text-base font-bold text-[#2b2b2b] mb-4">Routes les plus touchées</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topRoutes} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis type="category" dataKey="route" tick={{ fill: '#718096', fontSize: 11 }} axisLine={false} tickLine={false} width={160} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" name="Erreurs" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Log table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <h3 className="text-base font-bold text-[#2b2b2b] mr-auto">Journal des erreurs</h3>
          <input
            type="text"
            placeholder="Rechercher (message, route)..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200 w-64"
          />
          <select
            value={methodFilter}
            onChange={e => { setMethodFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            <option value="">Toutes les méthodes</option>
            {HTTP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {paginated.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            {logs.length === 0 ? 'Aucune erreur enregistrée.' : 'Aucun résultat pour ces filtres.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-3 font-medium w-6"></th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Méthode</th>
                  <th className="px-6 py-3 font-medium">Route</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(log => {
                  const isExpanded = expandedIds.has(log.id);
                  return (
                    <>
                      <tr
                        key={log.id}
                        onClick={() => toggleRow(log.id)}
                        className="border-t border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="pl-4 py-3 text-gray-400">
                          {isExpanded
                            ? <ChevronDown className="w-4 h-4" />
                            : <ChevronRight className="w-4 h-4" />
                          }
                        </td>
                        <td className="px-6 py-3 text-gray-500 whitespace-nowrap text-xs">
                          {new Date(log.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td className="px-6 py-3">
                          <MethodBadge method={log.method} />
                        </td>
                        <td className="px-6 py-3 text-gray-600 font-mono text-xs max-w-[200px] truncate" title={log.route ?? undefined}>
                          {log.route ?? '—'}
                        </td>
                        <td className="px-6 py-3 text-gray-700 max-w-sm truncate" title={log.message}>
                          {log.message}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${log.id}-detail`} className="bg-gray-50 border-t border-gray-100">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                                <span>
                                  <span className="font-semibold text-gray-700">Date complète : </span>
                                  {new Date(log.date).toLocaleString('fr-FR', {
                                    weekday: 'long', year: 'numeric', month: 'long',
                                    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
                                  })}
                                </span>
                                <span>
                                  <span className="font-semibold text-gray-700">ID : </span>
                                  <span className="font-mono">{log.id}</span>
                                </span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-700 mb-1">Message</p>
                                <p className="text-sm text-gray-700">{log.message}</p>
                              </div>
                              {log.stack && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-1">Stack trace</p>
                                  <pre className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all leading-5">
                                    {log.stack}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>{filtered.length} erreur{filtered.length > 1 ? 's' : ''}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Préc.
              </button>
              <span className="text-xs">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Suiv.
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
