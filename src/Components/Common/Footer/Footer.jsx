import React from "react";
import { Facebook, Linkedin } from "lucide-react";

// Logo Component
const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary transform rotate-45"></div>
        <span className="text-lg font-bold text-base-content">ContestHub</span>
    </div>
);

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" border-t border-base-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Logo />
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-sm text-base-content/70">© {currentYear} ContestHub. All rights reserved.</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm btn-circle"
                            aria-label="Facebook"
                        >
                            <Facebook size={20} className="text-base-content/70 hover:text-primary transition-colors" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm btn-circle"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} className="text-base-content/70 hover:text-primary transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
