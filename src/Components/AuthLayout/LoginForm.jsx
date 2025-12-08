import React, { useState } from "react";
import Divider from "./Divider";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
    const { signInUser, signInWithGoogle } = useAuth();
    const { register, handleSubmit, clearErrors, reset } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    //show toast
    const showToast = (message, type = "success", id = null) => {
        if (type === "success") toast.success(message, { id, duration: 4000 });
        else toast.error(message, { id, duration: 4000 });
    };

    const handleSignForm = async (data) => {
        setIsLoading(true);
        clearErrors();
        const loadingToast = toast.loading("Login your account...");
        try {
            await signInUser(data.email, data.password);

            toast.success("login successfull");
            reset();
            navigate("/");
        } catch (err) {
            showToast(err.message, "error", loadingToast);
        } finally {
            setIsLoading(false);
        }
        console.log("form data", data);
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        clearErrors()
        const loadingToast = toast.loading("Login your google account...");
        try {
            await signInWithGoogle();
            toast.success("google login successfull");
            navigate("/");
        } catch (err) {
            showToast(err.message, "error", loadingToast);
        }
    };

    const loader = <span className="loading loading-spinner loading-xs"></span>;
    return (
        <section className="w-120 flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-6">
            <Toaster />
            <form onSubmit={handleSubmit(handleSignForm)} className="flex flex-col gap-5">
                <div className="text-center flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold text-pink-600">Welcome Back!</h3>
                    <p className="text-sm text-slate-700">Sign in to your account to continue</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-slate-700">
                        Email
                    </label>
                    <input
                        className="w-full py-2 px-6 border bg-white border-gray-200 rounded-xl"
                        type="email"
                        name="email"
                        disabled={isLoading}
                        {...register("email", { required: true })}
                        placeholder="Enter email"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-slate-700 flex justify-between">
                        Password
                        <Link to="/auth/forget-password" className="text-blue-600 underline font-semibold text-sm">
                            Forget Password
                        </Link>
                    </label>
                    <input
                        className="w-full py-2 px-6 bg-white border border-gray-200 rounded-xl"
                        type="password"
                        name="password"
                        disabled={isLoading}
                        {...register("password", { required: true })}
                        placeholder="Create password"
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-info text-white w-full">
                        {isLoading ? loader : "Login"}
                    </button>
                </div>
            </form>
            <div>
                <Divider />
                <button onClick={handleGoogleLogin} className="btn w-full">
                    {isLoading ? (
                        loader
                    ) : (
                        <>
                            <FcGoogle />
                            <span>Register with Google</span>
                        </>
                    )}
                </button>
            </div>
            <div>
                <span>
                    Don't have an account?
                    <Link to="/auth/register" className="text-blue-600 ml-2 underline">
                        Register
                    </Link>
                </span>
            </div>
        </section>
    );
};

export default LoginForm;
