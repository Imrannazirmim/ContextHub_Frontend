import React from "react";
import RegisterForm from "../../Components/AuthLayout/RegisterForm";

const Register = () => {
    return (
        <>
            <section className="container mx-auto flex justify-center items-center flex-col">
                <div className="mt-20">
                    <h2 className="text-3xl text-slate-500 font-semibold">Create Your Account</h2>
                    <p className="text-sm text-center text-slate-500 mt-1">Unleash Your Creativity. Join the Hub</p>
                </div>
                <section className="mt-10">
                    <RegisterForm />
                </section>
            </section>
        </>
    );
};

export default Register;
