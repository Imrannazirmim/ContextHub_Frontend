import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <nav className="bg-white sticky top-0 z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Logo />

                        {/* Desktop Navigation - Only visible on large screens */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <NavLinks />
                        </div>


                        {/* Desktop Auth Buttons - Only visible on large screens */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <AuthButtons />
                        </div>

                        {/* Mobile Menu Button - Hidden on large screens */}
                        <button
                            onClick={toggleDrawer}
                            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none p-2"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
        </>
    );
};
export default Navbar;
