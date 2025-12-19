// src/components/Navbar.jsx
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import AuthButtons from "./AuthButtons";
import ThemeToggle from "../../../Utils/ThemeToggle";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <nav className="bg-base-100 sticky top-0 z-50 shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            <div className="hidden lg:flex items-center space-x-8">
              <NavLinks />
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle /> 
              <AuthButtons />
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <ThemeToggle /> {/* ← Same toggle on mobile */}
              <button
                onClick={toggleDrawer}
                className="btn btn-ghost btn-circle"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Navbar;