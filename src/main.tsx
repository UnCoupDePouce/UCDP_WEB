import './index.css';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';

import Menu from './components/navigation/Menu.tsx';
import Document from './pages/Document.tsx';
import Utilisateur from './pages/Utilisateur.tsx';
import Signalement from './pages/Signalement.tsx';
import Mission from './pages/Mission.tsx';
import Dashboard from "./pages/Dashboard.tsx";
import CreateUser from "./sub-pages/CreateUser.tsx";
import Error404 from "./pages/Error404.tsx";
import Header from "./components/navigation/Header.tsx";
import {useIsHorizontal} from "./hooks/horizontalFormat.ts";
import WrongFormat from './pages/WrongFormat';
import Login from "./pages/Login.tsx";

export default function AppRouter() {
    const isHorizontal = useIsHorizontal();

    if (!isHorizontal) {
        return <WrongFormat />;
    }

    return (
        <div className="isolate">
            <Header/>
            <main className="flex min-h-dvh flex-col bg-gray-950 pt-14">
                <div
                    className="relative isolate grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[var(--sidebar-width)_var(--gutter-width)_auto_var(--gutter-width)] [--sidebar-width:0] 2xl:[--sidebar-width:--spacing(72)] [--gutter-width:--spacing(6)] 2xl:[--gutter-width:--spacing(10)]">
                    <div className="col-start-2 row-span-full row-start-1 max-2xl:hidden border-x border-gray-800 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(31_41_55)_0,rgb(31_41_55)_1px,transparent_0,transparent_50%)]">
                    </div>

                    <div className="col-start-4 row-span-full row-start-1 max-2xl:hidden border-x border-gray-800 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(31_41_55)_0,rgb(31_41_55)_1px,transparent_0,transparent_50%)]">
                    </div>
                    <Menu/>
                    <div className="col-start-3 row-start-1 max-2xl:col-span-full max-2xl:col-start-1">
                            <div className="mx-auto mt-24 max-w-7xl 2xl:mt-20">
                                <Routes>
                                    <Route path="/" element={<Dashboard/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="utilisateurs" element={<Utilisateur/>}/>
                                    <Route path="utilisateurs/create" element={<CreateUser/>}/>
                                    <Route path="documents" element={<Document/>}/>
                                    <Route path="missions" element={<Mission/>}/>
                                    <Route path="signalements" element={<Signalement/>}/>
                                    <Route path='*' element={<Error404/>}/>
                                </Routes>
                            </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
);
