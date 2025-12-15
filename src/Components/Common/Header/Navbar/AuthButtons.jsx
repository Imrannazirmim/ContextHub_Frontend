import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import avater from "../../../../assets/download.jpeg";
import useAuth from "../../../../Hooks/useAuth";

const AuthButtons = ({ onClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    console.log(user);

    const handleNavigate = (path) => {
        navigate(path);
        if (onClose) onClose();
    };
    
    return (
        <div className="relative inline-block">
            {user ? (
                <>
                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-13 h-13 border border-purple-500 relative rounded-full overflow-hidden cursor-pointer"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={user.photoURL || avater}
                            alt={user.displayName || "User profile"}
                        />
                    </div>
                    {showMenu && (
                        <>
                            <div className="menu w-60 absolute hidden lg:flex lg:flex-col gap-3 right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 z-50 p-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-700">
                                        {user.displayName}
                                    </h3>
                                    <span className="text-sm text-slate-600">{user.email}</span>
                                </div>

                                 {/* Dashboard */}
                                <div className="flex items-center gap-2 hover:text-blue-600">
                                    <LuLayoutDashboard size={20} />
                                    <Link to="/leaderboard" className="text-[1rem] text-slate-700">
                                        Leaderboard
                                    </Link>
                                </div>

                                {/* Dashboard */}
                                <div className="flex items-center gap-2 hover:text-blue-600">
                                    <LuLayoutDashboard size={20} />
                                    <Link to="/dashboard/create-contest" className="text-[1rem] text-slate-700">
                                        Dashboard
                                    </Link>
                                </div>

                                {/* Profile */}
                                <div className="flex items-center gap-2 hover:text-blue-600">
                                    <CgProfile size={20} />
                                    <Link to="/user-profile" className="text-[1rem] text-slate-700">
                                        User Profile
                                    </Link>
                                </div>

                

                                {/* Sign Out */}
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-[1.1rem] text-red-600 hover:text-red-700 mt-2"
                                >
                                    <BiLogOutCircle size={22} />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <button
                        onClick={() => handleNavigate("/auth/register")}
                        className="btn btn-soft btn-info"
                    >
                        Register
                    </button>
                    <button
                        onClick={() => handleNavigate("/auth/login")}
                        className="btn btn-soft btn-success"
                    >
                        Login
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
