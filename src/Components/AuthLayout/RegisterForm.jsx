import React, { useState } from "react";
import Divider from "./Divider";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { validationRules } from "../Utils/validationRules.jsx";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { registerUser,  signInWithGoogle, setError } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (message, type = "success", id = null) => {
        if (type === "success") toast.success(message, { id, duration: 4000 });
        else toast.error(message, { id, duration: 4000 });
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const IMAGE_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
        const response = await axios.post(IMAGE_API_URL, formData);
        return response.data.data.display_url;
    };

    const handleRegisterForm = async (data) => {
        setIsLoading(true);
        setError(null);
        const loadingToast = toast.loading("Creating your account...");
        try {
            const photoURL = data.photo && data.photo.length > 0 ? await uploadImage(data.photo[0]) : "";

            await registerUser(data.email, data.password, data.name, photoURL);

            showToast("Account created successfully! Welcome aboard 🎉", "success", loadingToast);
            reset();
            navigate("/");
        } catch (err) {
            showToast(err.message || "Registration failed", "error", loadingToast);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading("Signing in with Google...");
        try {
            await signInWithGoogle();
            showToast("Signed in successfully! Welcome 🎉", "success", loadingToast);

            navigate("/");
        } catch (err) {
            showToast(err.message, "error", loadingToast);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="  border border-gray-200 rounded-xl p-6">
            <form onSubmit={handleSubmit(handleRegisterForm)} className="flex flex-col gap-5 w-120  ">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-slate-500">
                        FullName
                    </label>
                    <input
                        className="w-full py-2 px-6  border border-gray-200 rounded-xl"
                        type="text"
                        name="name"
                        id="name"
                        {...register("name", validationRules.name)}
                        disabled={isLoading}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-slate-500">
                        Email
                    </label>
                    <input
                        className="w-full py-2 px-6 border  border-gray-200 rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        {...register("email", validationRules.email)}
                        placeholder="Enter email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-slate-500">
                        Password
                    </label>
                    <input
                        className="w-full py-2 px-6 border border-gray-200 rounded-xl"
                        type="password"
                        name="password"
                        id="password"
                        {...register("password", validationRules.password)}
                        placeholder="Create password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="photo" className="text-slate-500 font-medium">
                        Choose Photo
                    </label>
                    <input
                        id="photo"
                        type="file"
                        name="photo"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        {...register("photo", validationRules.photo)}
                        className="w-full cursor-pointer py-2 px-6 border border-gray-200 rounded-xl  text-sm file:text-fuchsia-500 font-semibold file:mr-4"
                    />
                    {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
                </div>

                <div>
                    <button type="submit" className="btn btn-info text-white w-full">
                        Create Account
                    </button>
                </div>
            </form>

            <div>
                <Divider />
                <button onClick={handleGoogleSignIn} className="btn w-full">
                    <FcGoogle />
                    Register with Google
                </button>
            </div>
            <div className="mt-2">
                <span>
                    Already have account?
                    <Link to="/auth/login" className="text-blue-600 ml-2 underline">
                        Login
                    </Link>
                </span>
            </div>
            <Toaster />
        </section>
    );
};

export default RegisterForm;
