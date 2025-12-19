import React from "react";
import { Link } from "react-router";

const Logo = () => {
    return (
        <Link to='/' className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 transform rotate-45"></div>
            <span className="text-xl text-gray-500 font-bold ">ContestHub</span>
        </Link>
    );
};

export default Logo;
