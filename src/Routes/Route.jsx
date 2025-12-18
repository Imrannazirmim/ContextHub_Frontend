import { createBrowserRouter } from "react-router";
import React, { lazy } from "react";
import MainLayout from "../Components/Layout/MainLayout.jsx";
import AuthLayout from "../Components/Layout/AuthLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "../Pages/Error/ErrorPage.jsx";
import NotFound from "../Pages/Error/NotFound.jsx";
import Loading from "../Components/Utils/Loading.jsx";
import Analytics from "../Pages/DashbaordPage/Analytics.jsx";

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
const CreateContest = lazy(() => import("../Pages/DashbaordPage/CreateContext.jsx"));
const MyContest = lazy(() => import("../Pages/DashbaordPage/MyContest.jsx"));
const MyParticipated = lazy(() => import("../Pages/DashbaordPage/MyParticipated.jsx"));
const MyWinning = lazy(() => import("../Pages/DashbaordPage/MyWinning.jsx"));
const PaymentHistory = lazy(() => import("../Pages/Payment/PaymentHistory.jsx"));
const ManageUser = lazy(() => import("../Pages/DashbaordPage/ManageUser.jsx"));
const ManageContest = lazy(() => import("../Pages/DashbaordPage/ManageContest.jsx"));
const Leaderboard = lazy(() => import("../Pages/LeaderBoard/Leaderboard.jsx"));

// CRITICAL: Import MySubmission
const MySubmission = lazy(() => import("../Pages/DashbaordPage/MySubmission.jsx"));

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <Loading />,
        children: [
            { index: true, Component: Home },
            { path: "contest", Component: AllContest },
            { path: "contest/:id", Component: ContestDetails },
            {
                path: "leaderboard",
                Component: () => (
                    <PrivateRoute>
                        <Leaderboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "checkout-payment/:contestId",
                Component: () => (
                    <PrivateRoute>
                        <CheckoutPayment />
                    </PrivateRoute>
                ),
            },
            {
                path: "payment-success",
                Component: () => (
                    <PrivateRoute>
                        <PaymentSuccess />
                    </PrivateRoute>
                ),
            },
            {
                path: "auth",
                Component: AuthLayout,
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                    { path: "forget-password", Component: ForgetPassword },
                ],
            },
            { path: "*", Component: NotFound },
        ],
    },
    {
        path: "dashboard",
        Component: () => (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            { path: "create-contest", Component: CreateContest },
            { path: "my-contest", Component: MyContest },
            { path: "my-participated", Component: MyParticipated },
            { path: "my-winning", Component: MyWinning },
            { path: "payment-history", Component: PaymentHistory },
            { path: "manage-users", Component: ManageUser },
            { path: "manage-contest", Component: ManageContest },

            // FIXED: This route now requires :contestId
            { path: "my-submission/:contestId", Component: MySubmission },
            {path:'analytics', Component: Analytics}
            

        ],
    },
]);
