import { userData } from "../data/mock.ts";

export default function Utilisateur() {
    const admins = userData.filter((user) => user.role === "Admin");
    const members = userData.filter((user) => user.role !== "Admin");

    const renderRows = (users: typeof userData) =>
        users.map((user) => (
            <tr key={user.email}>
                <td className="px-6 py-3 text-sm text-white w-1/5">{user.name}</td>
                <td className="px-6 py-3 text-sm text-gray-300 w-1/5">{user.title}</td>
                <td className="px-6 py-3 text-sm text-gray-300 w-2/5">{user.email}</td>
                <td className="px-6 py-3 text-sm text-gray-300 w-1/5">{user.role}</td>
                <td className="px-6 py-3 text-sm w-1/5">
                    <a href="#" className="text-indigo-500 hover:text-indigo-400 font-medium">
                        Edit
                    </a>
                </td>
            </tr>
        ));

    return (
        <div className="px-8" style={{ height: "calc(100vh - 80px)" }}>
            <div className="py-10">
                <div className="mx-auto w-7xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[16px] font-semibold text-white">Utilisateurs</h1>
                            <p className="mt-2 text-sm text-gray-400">
                                Liste de tous les utilisateurs de l'application avec leur nom, prénom ainsi que leur rôle
                            </p>
                        </div>
                        <button
                            type="button"
                            className="cursor-pointer hover:bg-indigo-900 transition duration-200 text-center py-2 px-3 bg-indigo-700 rounded-md text-sm font-semibold text-white"
                        >
                            Add user
                        </button>
                    </div>

                    <div className="flow-root mt-8">
                        <div className="-mx-8 overflow-x-auto -my-2">
                            <div className="inline-block min-w-full py-2 align-middle px-8">
                                <div className="overflow-hidden border-white/10 rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-700/50">
                                        <tr>
                                            <th className="text-left px-4 py-2 text-sm font-semibold text-white">Name</th>
                                            <th className="text-left px-4 py-2 text-sm font-semibold text-white">Title</th>
                                            <th className="text-left px-4 py-2 text-sm font-semibold text-white">Email</th>
                                            <th className="text-left px-4 py-2 text-sm font-semibold text-white">Role</th>
                                            <th className="text-left px-4 py-2 text-sm font-semibold text-white">Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                        {/* Section Admin */}
                                        {admins.length > 0 && (
                                            <>
                                                <tr className="bg-gray-800">
                                                    <td colSpan={5} className="px-6 py-2 text-sm font-semibold text-indigo-400">
                                                        Admins
                                                    </td>
                                                </tr>
                                                {renderRows(admins)}
                                            </>
                                        )}

                                        {/* Section Members */}
                                        {members.length > 0 && (
                                            <>
                                                <tr className="bg-gray-800">
                                                    <td colSpan={5} className="px-6 py-2 text-sm font-semibold text-indigo-400">
                                                        Members
                                                    </td>
                                                </tr>
                                                {renderRows(members)}
                                            </>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
