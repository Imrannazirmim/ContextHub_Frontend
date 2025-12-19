import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import { Suspense } from "react";
import Loading from "../Utils/Loading";

const AuthLayout = () => {
    return (
        <Suspense fallback={<Loading />}>
            <main className="min-h-screen bg-base-100 text-base-content">
                <Outlet />
            </main>
        </Suspense>
    );
};

export default AuthLayout;
