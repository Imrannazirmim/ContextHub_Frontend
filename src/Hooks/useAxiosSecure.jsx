import axios from "axios";
import useAuth from "./useAuth.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    console.log(user);
    
    useEffect(() => {
        const requestInstance = axiosInstance.interceptors.request.use(
            (config) => {
                const token = user?.accessToken;
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInstance = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    logOut().then(() => {
                        navigate("/auth/login");
                    });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInstance);
            axiosInstance.interceptors.response.eject(responseInstance);
        };
    }, [user, logOut, navigate]);

    return axiosInstance;
};
export default useAxiosSecure;
