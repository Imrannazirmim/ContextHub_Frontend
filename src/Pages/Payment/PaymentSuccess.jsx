import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionId || !user) {
            navigate("/contest");
            return;
        }

        let hasRun = false;

        const confirmPayment = async () => {
            if (hasRun) return; 
            hasRun = true;

            try {
                const token = await user.getIdToken();
                const res = await axiosSecure.post(
                    "/payment/confirm",
                    { sessionId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("Payment confirm response:", res.data);

                // Auto redirect after 4 seconds
                setTimeout(() => {
                    navigate("/contest");
                }, 4000);
            } catch (err) {
                console.error("Payment confirm failed:", err);
                setTimeout(() => {
                    navigate("/contest");
                }, 5000);
            }
        };

        confirmPayment();

        
        return () => {
            hasRun = true;
        };
    }, [sessionId, user, axiosSecure, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-50 to-blue-50 px-4">
            <div className="text-center max-w-md">
                <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Congratulations! You are now officially registered for the contest.
                </p>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <p className="text-gray-600 mb-6">Redirecting you to contests page in a few seconds...</p>
                    <button onClick={() => navigate("/contest")} className="btn btn-accent btn-lg">
                        Browse All Contests Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
