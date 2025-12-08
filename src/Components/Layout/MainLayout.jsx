import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Common/Footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-100">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
