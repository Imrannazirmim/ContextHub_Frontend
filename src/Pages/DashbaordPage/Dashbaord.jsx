import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import useUser from "../../Hooks/useUser";
import { FiCheckSquare, FiFileText, FiList, FiMenu, FiPlus, FiUser, FiUsers, FiX } from "react-icons/fi";
import { AiFillTrophy } from "react-icons/ai";
import { Suspense } from "react";
import Loading from "../../Components/Utils/Loading";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { userData } = useUser();

    const userLinks = [
        { to: "/dashboard/my-participated", icon: FiList, label: "My Participated" },
        { to: "/dashboard/my-winning", icon: AiFillTrophy, label: "My Winnings" },
        { to: "/dashboard/payment-history", icon: AiFillTrophy, label: "Payment History" },
        { to: "/dashboard/user-profile", icon: FiUser, label: "My Profile" },
    ];

    const creatorLinks = [
        { to: "/dashboard/create-contest", icon: FiPlus, label: "Add Contest" },
        { to: "/dashboard/my-contest", icon: FiFileText, label: "My Created Contests" },
    ];

    const adminLinks = [
        { to: "/dashboard/manage-users", icon: FiUsers, label: "Manage Users" },
        { to: "/dashboard/manage-contests", icon: FiCheckSquare, label: "Manage Contests" },
    ];

    // const isCreator = userData?.role === "creator" || userData?.role === "admin";
    // const isAdmin = userData?.role === "admin";

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-gray-600 dark:text-gray-400"
                            >
                                <FiX className="text-2xl" />
                            </button>
                        </div>

                        {userData && (
                            <div className="flex items-center gap-3">
                                <img
                                    src={userData.photoURL || "https://via.placeholder.com/40"}
                                    alt={userData.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {userData.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                        {userData.role}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* User Links */}
                        <div>
                            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                User
                            </p>
                            {userLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-primary-600 text-pink-500"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <link.icon className="text-xl" />
                                    <span className="font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        {/* Creator Links */}
                        {/* {isCreator && ( */}
                        <div>
                            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Creator
                            </p>
                            {creatorLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-primary-600 text-white"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <link.icon className="text-xl" />
                                    <span className="font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        {/* )} */}

                        {/* Admin Links */}
                        {/* {isAdmin && ( */}
                        <div>
                            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Admin
                            </p>
                            {adminLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-primary-600 text-white"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    <link.icon className="text-xl" />
                                    <span className="font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                        {/* )} */}
                    </nav>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 dark:text-gray-400">
                        <FiMenu className="text-2xl" />
                    </button>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
