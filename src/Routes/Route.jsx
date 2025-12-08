import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/Layout/MainLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Components/Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import NotFound from "../Pages/Error/NotFound";
import ForgetPassword from "../Pages/Auth/ForgetPassword";

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
                path: "auth",
                Component: AuthLayout,
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                    {path: 'forget-password', Component: ForgetPassword}
                ],
            },
            { path: "*", Component: NotFound },
        ],
    },
]);
