import React from "react";
import LoginForm from "../../Components/AuthLayout/LoginForm";

const Login = () => {
    return (
        <section className="container mx-auto flex justify-center items-center flex-col">
            <div className="mt-20">
                <h2 className="text-3xl text-slate-700 font-semibold">ContestHub</h2>
            </div>
            <section className="mt-10">
                <LoginForm />
            </section>
        </section>
    );
};

export default Login;
