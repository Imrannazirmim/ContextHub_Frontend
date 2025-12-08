import React from "react";

const Register = () => {
    return (
        <>
            <section>
                <div>
                    <h2>Create Your Account</h2>
                    <p>Unleash Your Creativity. Join the Hub</p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="name">FullName</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
            </section>
        </>
    );
};

export default Register;
