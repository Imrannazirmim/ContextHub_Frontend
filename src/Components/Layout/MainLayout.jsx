import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Common/Footer/Footer";
import { Suspense } from "react";
import Loading from "../Utils/Loading";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Suspense fallback={Loading}>
                <main className="min-h-screen bg-slate-100">
                    <Outlet />
                </main>
            </Suspense>

            <Footer />
        </>
    );
};

export default MainLayout;
