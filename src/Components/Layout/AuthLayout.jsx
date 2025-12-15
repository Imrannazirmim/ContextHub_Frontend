import React from "react";
import Navbar from "../Common/Header/Navbar/Navbar";
import { Outlet } from "react-router";
import { Suspense } from "react";
import Loading from "../Utils/Loading";

const AuthLayout = () => {
    return (
        <Suspense fallback={<Loading />}>
            <main>
                <Outlet />
            </main>
        </Suspense>
    );
};

export default AuthLayout;
