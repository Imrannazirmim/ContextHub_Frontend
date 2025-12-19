import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import useUser from "../../Hooks/useUser";
import { FiCheckSquare, FiFileText, FiList, FiMenu, FiPlus, FiUsers, FiX } from "react-icons/fi";
import { AiFillTrophy } from "react-icons/ai";
import { Suspense } from "react";
import Loading from "../../Components/Utils/Loading";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { userData, loading } = useUser();
    const navigate = useNavigate();
    const { user } = useAuth();
    if (loading) return <Loading />;
    if (!userData) return <div className="p-8 text-center">Unauthorized. Please log in.</div>;

    const userRole = userData.user || userData;
    const role = userRole.role || "user";

    const isCreator = role === "creator" || role === "admin";
    const isAdmin = role === "admin";

    const userLinks = [
        { to: "my-participated", icon: FiList, label: "My Participated" },
        { to: "my-winning", icon: AiFillTrophy, label: "My Winnings" },
        { to: "payment-history", icon: FiFileText, label: "Payment History" },
    ];

    const creatorLinks = [
        { to: "create-contest", icon: FiPlus, label: "Add Contest" },
        { to: "my-contest", icon: FiFileText, label: "My Created Contests" },
    ];

    const adminLinks = [
        { to: "manage-users", icon: FiUsers, label: "Manage Users" },
        { to: "manage-contest", icon: FiCheckSquare, label: "Manage Contests" },
        { to: "analytics", icon: FiCheckSquare, label: "Analytics" },
    ];

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive
                ? "bg-pink-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`;

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex min-h-screen">
            {/* Mobile Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    <button onClick={() => navigate("/")} className="mt-5 btn mx-2">
                        Go to home
                    </button>

                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                            <button onClick={closeSidebar} className="lg:hidden">
                                <FiX className="text-2xl text-gray-500" />
                            </button>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL || "https://i.pravatar.cc/40"}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium truncate text-gray-500 max-w-[140px]">{user.displayName}</p>
                                <p className="text-xs text-gray-500 capitalize">{role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* User Menu */}
                        <div>
                            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                User Menu
                            </p>
                            {userLinks.map((link) => (
                                <NavLink key={link.to} to={link.to} onClick={closeSidebar} className={navLinkClasses}>
                                    <link.icon className="text-xl" />
                                    <span>{link.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        {/* Creator Menu */}
                        {isCreator && (
                            <div>
                                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Creator Menu
                                </p>
                                {creatorLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={closeSidebar}
                                        className={navLinkClasses}
                                    >
                                        <link.icon className="text-xl" />
                                        <span>{link.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}

                        {/* Admin Menu */}
                        {isAdmin && (
                            <div>
                                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Admin Menu
                                </p>
                                {adminLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={closeSidebar}
                                        className={navLinkClasses}
                                    >
                                        <link.icon className="text-xl" />
                                        <span>{link.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden shadow-md p-4">
                    <button onClick={() => setSidebarOpen(true)}>
                        <FiMenu className="text-2xl" />
                    </button>
                </header>

                {/* Page Content */}
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
