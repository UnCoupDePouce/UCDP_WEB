import {NavLink} from "react-router";

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between px-12 bg-gray-950 text-white border-b border-gray-800">
            <div className="flex flex-1 justify-start">
                <NavLink to="/" className="text-sm/6 font-semibold text-white">Un Coup de Pouce</NavLink>
            </div>
            <div className="flex flex-1 justify-end">
                <NavLink to="/login" className="text-sm/6 font-semibold text-white">Log in <span
                    aria-hidden="true">&rarr;</span></NavLink>
            </div>
        </header>
    )
}