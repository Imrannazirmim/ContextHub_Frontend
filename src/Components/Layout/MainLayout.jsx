import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Common/Footer/Footer";
import { Suspense } from "react";
import Loading from "../Utils/Loading";
import { Toaster } from "react-hot-toast"; // ← Add this import

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <main className="min-h-screen bg-slate-100">
                    <Outlet />
                </main>
            </Suspense>

            <Footer />

            {/* Global Toaster - visible everywhere */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#333",
                        color: "#fff",
                    },
                }}
            />
        </>
    );
};

export default MainLayout;
