import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <>
        
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
