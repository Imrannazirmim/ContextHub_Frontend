import { createBrowserRouter, Navigate } from "react-router";
import React, { lazy, Suspense } from "react";
import MainLayout from "../Components/Layout/MainLayout.jsx";
import AuthLayout from "../Components/Layout/AuthLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "../Pages/Error/ErrorPage.jsx";
import NotFound from "../Pages/Error/NotFound.jsx";
import Loading from "../Components/Utils/Loading.jsx";
import AdminRoute from "./AdminRoute.jsx";

// Lazy loaded pages
const Home = lazy(() => import("../Pages/Home/Home.jsx"));
const AllContest = lazy(() => import("../Pages/contest/AllContest.jsx"));
const ContestDetails = lazy(() => import("../Pages/contest/ContestDetails.jsx"));
const CheckoutPayment = lazy(() => import("../Pages/Payment/CheckoutPayment.jsx"));
const PaymentSuccess = lazy(() => import("../Pages/Payment/PaymentSuccess.jsx"));
const Login = lazy(() => import("../Pages/Auth/Login.jsx"));
const Register = lazy(() => import("../Pages/Auth/Register.jsx"));
const ForgetPassword = lazy(() => import("../Pages/Auth/ForgetPassword.jsx"));

const Dashboard = lazy(() => import("../Pages/DashbaordPage/Dashbaord.jsx"));

// Dashboard Pages
const CreateContest = lazy(() => import("../Pages/DashbaordPage/CreateContext.jsx"));
const MyContest = lazy(() => import("../Pages/DashbaordPage/MyContest.jsx"));
const MyParticipated = lazy(() => import("../Pages/DashbaordPage/MyParticipated.jsx"));
const MyWinning = lazy(() => import("../Pages/DashbaordPage/MyWinning.jsx"));
const PaymentHistory = lazy(() => import("../Pages/Payment/PaymentHistory.jsx"));
const ManageUser = lazy(() => import("../Pages/DashbaordPage/ManageUser.jsx"));
const ManageContest = lazy(() => import("../Pages/DashbaordPage/ManageContest.jsx"));
const MySubmission = lazy(() => import("../Pages/DashbaordPage/MySubmission.jsx"));
const Analytics = lazy(() => import("../Pages/DashbaordPage/Analytics.jsx"));

const Leaderboard = lazy(() => import("../Pages/LeaderBoard/Leaderboard.jsx"));
const Why = lazy(() => import("../Pages/Discover/Why.jsx"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "contest",
                element: (
                    <Suspense fallback={<Loading />}>
                        <AllContest />
                    </Suspense>
                ),
            },
            {
                path: "contest/:id",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ContestDetails />
                    </Suspense>
                ),
            },
            {
                path: "why",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Why />
                    </Suspense>
                ),
            },
            {
                path: "leaderboard",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loading />}>
                            <Leaderboard />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "checkout-payment/:contestId",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loading />}>
                            <CheckoutPayment />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "payment-success",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<Loading />}>
                            <PaymentSuccess />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <Login />
                            </Suspense>
                        ),
                    },
                    {
                        path: "register",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <Register />
                            </Suspense>
                        ),
                    },
                    {
                        path: "forget-password",
                        element: (
                            <Suspense fallback={<Loading />}>
                                <ForgetPassword />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },

    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Suspense fallback={<Loading />}>
                    <Dashboard />
                </Suspense>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/my-participated" replace />,
            },

            {
                path: "my-participated",
                element: <MyParticipated />,
            },
            {
                path: "my-winning",
                element: <MyWinning />,
            },
            {
                path: "payment-history",
                element: <PaymentHistory />,
            },

            {
                path: "create-contest",
                element: <CreateContest />,
            },
            {
                path: "my-contest",
                element: <MyContest />,
            },

            {
                path: "my-submission/:contestId",
                element: <MySubmission />,
            },

            {
                path: "manage-users",
                element: (
                    <AdminRoute>
                        <ManageUser />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-contest",
                element: (
                    <AdminRoute>
                        <ManageContest />
                    </AdminRoute>
                ),
            },
            {
                path: "analytics",
                element: (
                    <AdminRoute>
                        <Analytics />
                    </AdminRoute>
                ),
            },
        ],
    },
]);
