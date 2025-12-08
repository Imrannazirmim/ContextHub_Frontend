import { NavLink } from "react-router";

const NavLinks = ({ onClick }) => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/contests", label: "All Contests" },
        { href: "/why", label: "Why ContestHub?" },
        
    ];

    return (
        <>
            {links.map((link) => (
                <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={onClick}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                    {link.label}
                </NavLink>
            ))}
        </>
    );
};
export default NavLinks;
