import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Utils/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const CheckoutPayment = () => {
    const { contestId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {
        data: response,
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

    const contest = response?.contest;
    const entryFee = contest?.entryFee || contest?.price; 

    if (!contestId) {
        return <div className="text-center py-10 text-red-600">Invalid contest ID</div>;
    }

    if (isLoading) return <Loading />;

    if (isError || !contest) {
        return (
            <div className="text-center py-10">
                <p className="text-red-600 mb-4">Failed to load contest details. Please try again.</p>
                <button onClick={() => navigate(-1)} className="btn btn-outline">
                    Go Back
                </button>
            </div>
        );
    }

    const handlePayment = async () => {
        if (!entryFee || entryFee <= 0) {
            toast.error("Invalid entry fee");
            return;
        }

        try {
            toast.loading("Redirecting to payment...", { id: "payment-toast" });

            const res = await axiosSecure.post("/payment-checkout-session", {
                contestId,
                amount: entryFee, 
            });

            if (res.data.url) {
                toast.dismiss("payment-toast");
                window.location.href = res.data.url;
            } else {
                throw new Error("No payment URL received");
            }
        } catch (err) {
            toast.dismiss("payment-toast");
            console.error("Payment error:", err);

            const message = err.response?.data?.message || err.message || "Payment failed. Please try again.";

            if (message.toLowerCase().includes("already registered")) {
                toast.success("You're already registered for this contest!");
                navigate(`/contest/${contestId}`);
            } else {
                toast.error(message);
            }
        }
    };

    return (
        <>
            <Toaster position="top-center" />

            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Complete Your Registration</h2>

                <div className="space-y-6">
                    {/* Contest Info Card */}
                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{contest.name}</h3>

                        <div className="space-y-3 text-lg">
                            <p>
                                <span className="font-medium text-gray-700">Entry Fee:</span>{" "}
                                <span className="font-bold text-2xl text-blue-600">${entryFee}</span>
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">Prize Money:</span>{" "}
                                <span className="font-bold text-green-600">${contest.prizeMoney || contest.prize}</span>
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">Type:</span>{" "}
                                <span className="badge badge-primary badge-lg">{contest.contestType}</span>
                            </p>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        onClick={handlePayment}
                        className="w-full btn btn-primary btn-lg text-xl py-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        Pay ${entryFee} & Register Now
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Secured by Stripe • No refunds after registration
                    </p>
                </div>
            </div>
        </>
    );
};

export default CheckoutPayment;
