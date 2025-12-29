import {NavLink} from "react-router";
import {menuItems} from "../../data/menu.ts";

function Menu() {

    return (
        <div className="col-start-1 row-span-2 row-start-1 max-2xl:hidden">
            <div
                className="sticky top-14 z-10 flex h-full max-h-[calc(100dvh---spacing(14))] flex-col bg-white dark:bg-gray-950">
                <div className="flex-1 overflow-y-auto p-6">
                    <ul role="list" className="flex flex-col gap-8">
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
                                                        className={({isActive}) =>
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
                </div>
            </div>
        </div>
    )
}

export default Menu