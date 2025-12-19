import { Moon, Sun, X } from "lucide-react";
import AuthButtons from "./AuthButtons";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

const MobileDrawer = ({ isOpen, onClose }) => (
    <>
        {/* Overlay */}
        {isOpen && <div className="fixed inset-0 bg-black/90 bg-opacity-50 z-40 lg:hidden" onClick={onClose}></div>}

        {/* Drawer */}
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <span className="text-lg font-bold text-gray-900">
                    <Logo />
                </span>
                <button onClick={onClose} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                    <X size={24} />
                </button>
            </div>

            {/* Drawer Content */}
            <div className="flex flex-col p-6 space-y-6">
                <div className="flex flex-col space-y-4">
                    <NavLinks onClick={onClose} />
                </div>

                <div className="flex flex-col space-y-3 pt-4 border-t">
                    <AuthButtons onClose={onClose} />
                </div>
            </div>
        </div>
    </>
);
export default MobileDrawer;
