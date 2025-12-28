import {NavLink} from "react-router";
import {menuItems} from "../data/menu.ts";

function Menu() {

    return (
        <div className="flex flex-col w-72 z-10 inset-0 fixed bg-gray-900">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-1 border-white/10 bg-white/10 px-6">
                <div className="flex items-center shrink-0 h-16">
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=500"
                         alt="Your Company" className="w-auto h-8"/>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 list-none flex flex-1 flex-col gap-y-2">
                                        {menuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <li key={item.to}>
                                                    <NavLink
                                                        to={item.to}
                                                        className={({ isActive }) =>
                                                            `flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold ${
                                                                isActive ? "bg-white/5 text-white" : "text-gray-500 hover:bg-white/5"
                                                            }`
                                                        }
                                                    >
                                                        <Icon
                                                            className="w-6 h-6"
                                                            strokeWidth={1.5}
                                                        />
                                                        {item.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Menu