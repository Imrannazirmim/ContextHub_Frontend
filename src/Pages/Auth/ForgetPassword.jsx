import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const ForgetPassword = () => {
    const { forgetPassword } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const emailLogin = location.state?.email || "";

    const onSubmit = async (data) => {
        setIsLoading(true);
        const loadingToast = toast.loading("Sending reset email...");

        try {
            await forgetPassword(data.email);
            toast.success("Password reset email sent! Check your inbox 📩", { id: loadingToast });
            navigate("/auth/login");
        } catch (err) {
            toast.error(err.message, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-120 mx-auto bg-white border border-gray-300 rounded-xl p-6">
            <Toaster />

            <h2 className="text-2xl font-semibold text-center text-pink-600 mb-4">Forgot Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    defaultValue={emailLogin}
                    {...register("email", { required: true })}
                    disabled={isLoading}
                    className="w-full py-2 px-4 border rounded-xl"
                />

                <button type="submit" disabled={isLoading} className="btn btn-info text-white">
                    {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>

            <p className="text-center mt-4">
                Remembered your password?
                <Link to="/auth/login" className="text-blue-600 underline ml-2">
                    Login
                </Link>
            </p>
        </section>
    );
};

export default ForgetPassword;
