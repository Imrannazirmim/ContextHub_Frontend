import { useNavigate } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import avater from '../../../../assets/download.jpeg'

const AuthButtons = ({ onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
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
                            <ul className="menu absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50">
                                <li>
                                    <a>Item 2</a>
                                </li>
                                <li>
                                    <a>Item 1</a>
                                </li>
                                <li>
                                    <a>Item 3</a>
                                </li>
                            </ul>
                        </>
                    )}
                </>
            ) : (
                <>
                    <button onClick={() => handleNavigate("/auth/register")} className="btn btn-soft btn-info">
                        Register
                    </button>
                    <button onClick={() => handleNavigate("/auth/login")} className="btn btn-soft btn-success">
                        Login
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
