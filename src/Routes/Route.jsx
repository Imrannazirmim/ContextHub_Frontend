import { createBrowserRouter } from "react-router";
import React, { lazy } from "react";
import MainLayout from "../Components/Layout/MainLayout.jsx";
import AuthLayout from "../Components/Layout/AuthLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "../Pages/Error/ErrorPage.jsx";
import NotFound from "../Pages/Error/NotFound.jsx";
import MyContest from "../Pages/DashbaordPage/MyContest.jsx";

// Lazy-loaded pages
const Home = lazy(() => import("../Pages/Home/Home.jsx"));
const UserProfile = lazy(() => import("../Pages/Profile/UserProfile.jsx"));
const AllContest = lazy(() => import("../Pages/contest/AllContest.jsx"));
const ContestDetails = lazy(() => import("../Pages/contest/ContestDetails.jsx"));
const CheckoutPayment = lazy(() => import("../Pages/Payment/CheckoutPayment.jsx"));
const PaymentSuccess = lazy(() => import("../Pages/Payment/PaymentSuccess.jsx"));
const Login = lazy(() => import("../Pages/Auth/Login.jsx"));
const Register = lazy(() => import("../Pages/Auth/Register.jsx"));
const ForgetPassword = lazy(() => import("../Pages/Auth/ForgetPassword.jsx"));
const Dashboard = lazy(() => import("../Pages/DashbaordPage/Dashbaord.jsx"));
const CreateContest = lazy(() => import("../Pages/DashbaordPage/CreateContext.jsx"));
const Submission = lazy(() => import("../Pages/DashbaordPage/Submission.jsx"));
const Analytics = lazy(() => import("../Pages/DashbaordPage/Analytics.jsx"));

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: MainLayout,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, Component: Home },
//       {
//         path: "user-profile",
//         Component: (
//           <PrivateRoute>
//             <UserProfile />
//           </PrivateRoute>
//         ),
//       },
//       { path: "contest", Component: AllContest },
//       { path: "contest/:id", Component: ContestDetails },
//       {
//         path: "checkout-payment",
//         Component: (
//           <PrivateRoute>
//             <CheckoutPayment />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "payment-success",
//         Component: (
//           <PrivateRoute>
//             <PaymentSuccess />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "auth",
//         Component: AuthLayout,
//         children: [
//           { path: "login", Component: Login },
//           { path: "register", Component: Register },
//           { path: "forget-password", Component: ForgetPassword },
//         ],
//       },
//       { path: "*", Component: NotFound },
//     ],
//   },
//   {
//     path: "dashboard",
//     Component: (
//       <PrivateRoute>
//         <Dashboard />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, Component: Dashboard },
//       { path: "create-contest", Component: CreateContest },
//       { path: "submission", Component: Submission },
//       { path: "analytics", Component: Analytics },
//     ],
//   },
// ]);

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: Home },
            {
                path: "user-profile",
                Component: () => (
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                ),
            },
            { path: "contest", Component: AllContest },
            { path: "contest/:id", Component: ContestDetails },
            {
                path: "checkout-payment",
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
            // { index: true, Component: Dashboard },
            { path: "create-contest", Component: CreateContest },
            {path: 'my-contest', Component: MyContest},
            { path: "submission", Component: Submission },
            { path: "analytics", Component: Analytics },
        ],
    },
]);
