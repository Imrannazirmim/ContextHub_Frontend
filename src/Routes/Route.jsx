import { createBrowserRouter } from "react-router";
import AuthLayout from "../Components/Layout/AuthLayout";
import MainLayout from "../Components/Layout/MainLayout";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Analytics from "../Pages/DashbaordPage/Analytics";
import CreateContext from "../Pages/DashbaordPage/CreateContext";
import Dashboard from "../Pages/DashbaordPage/Dashbaord";
import Submission from "../Pages/DashbaordPage/Submission";
import ErrorPage from "../Pages/Error/ErrorPage";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/Profile/UserProfile";
import AllContest from "../Pages/contest/AllContest";
import ContestDetails from "../Pages/contest/ContestDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "user-profile",
                Component: UserProfile,
            },
            {
                path: 'contest',
                Component: AllContest
            },
            {
                path: 'contest/:id',
                Component: ContestDetails
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
        Component: Dashboard,
        children: [
            { path: "create-contest", Component: CreateContext },
            { path: "submission", Component: Submission },
            { path: "analytics", Component: Analytics },
        ],
    },
]);
