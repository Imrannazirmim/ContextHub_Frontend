import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";

import { Link, Outlet } from "react-router";
import Logo from "../../Components/Common/Header/Navbar/Logo";

const Dashboard = () => {
    return (
        <main>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <TbLayoutSidebarRightExpand className="my-1.5 inline-block size-4" />
                        </label>
                        <div className="px-4">
                            <Logo />
                        </div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start justify-between bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu justify-between w-full grow">
                            {/* List item */}

                            <div>
                                <li>
                                    <Link
                                        to="/"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Homepage"
                                    >
                                        {/* Home icon */}
                                        <GoHome className="my-1.5 inline-block size-6" />
                                        <span className="is-drawer-close:hidden text-[1.1rem] text-pink-500 font-semibold">Go to Home</span>
                                    </Link>
                                </li>

                                <div className="mt-20">
                                    <li>
                                        <Link
                                            to="/dashboard/create-contest"
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Homepage"
                                        >
                                            {/* Home icon */}
                                            <IoCreateOutline className="my-1.5 inline-block size-4" />
                                            <span className="is-drawer-close:hidden">Create Contest</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/dashboard/submission"
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Homepage"
                                        >
                                            {/* Home icon */}
                                            <MdChecklist className="my-1.5 inline-block size-4" />
                                            <span className="is-drawer-close:hidden">Submission</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/dashboard/analytics"
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Homepage"
                                        >
                                            {/* Home icon */}
                                            <IoAnalyticsOutline className="my-1.5 inline-block size-4" />
                                            <span className="is-drawer-close:hidden">Analytics</span>
                                        </Link>
                                    </li>
                                </div>
                            </div>

                            {/* List item */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Settings"
                                >
                                    {/* Settings icon */}
                                    <IoSettingsOutline className="my-1.5 inline-block size-4" />
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
