import React from "react";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Utils/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const CheckoutPayment = () => {
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const { contestId, entryFee } = location.state || {};

    const {
        data: contest,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["contest", contestId],
        enabled: !!contestId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${contestId}`);
            return res.data;
        },
    });

    if (!contestId) return <p>Invalid contest</p>;
    if (isLoading) return <Loading />;
    if (isError) return <p>Failed to load contest</p>;

    // 🚀 Create Checkout Session
    const handlePayment = async () => {
        try {
            const res = await axiosSecure.post("/payment-checkout-session", {
                contestId,
                amount: entryFee,
            });

            window.location.href = res.data.url;
        } catch (err) {
            toast.error("Please create account", err.message);
        }
    };

    return (
        <>
            <Toaster />
            <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>

                <p>
                    <strong>Contest:</strong> {contest.name}
                </p>
                <p>
                    <strong>Entry Fee:</strong> ${entryFee}
                </p>

                <button
                    onClick={handlePayment}
                    className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Pay ${entryFee}
                </button>
            </div>
        </>
    );
};

export default CheckoutPayment;
