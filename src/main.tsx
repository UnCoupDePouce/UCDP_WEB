import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import Menu from './components/Menu.tsx';
import Document from './pages/Document.tsx';
import Utilisateur from './pages/Utilisateur.tsx';
import Signalement from './pages/Signalement.tsx';
import Mission from './pages/Mission.tsx';
import Dashboard from "./pages/Dashboard.tsx";

export default function AppRouter() {
    return (
        <div className="flex">
            <aside>
                <Menu />
            </aside>

            <main className="min-h-screen w-screen pl-72 py-10 bg-gray-900">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="utilisateurs" element={<Utilisateur />} />
                    <Route path="documents" element={<Document />} />
                    <Route path="missions" element={<Mission />} />
                    <Route path="signalements" element={<Signalement />} />
                </Routes>
            </main>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
);
