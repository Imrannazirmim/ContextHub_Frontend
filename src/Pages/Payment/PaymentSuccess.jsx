import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // get current user
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const confirmPayment = async () => {
            if (!sessionId || !user) return;

            try {
                // Get fresh Firebase ID token
                const token = await user.getIdToken();

                await axiosSecure.post(
                    "/payment/confirm",
                    { sessionId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        confirmPayment();
    }, [sessionId, user, axiosSecure]);

    if (loading) {
        return <p className="text-center mt-10">Confirming payment...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-2">You are now registered.</p>
            <button onClick={()=>navigate('/contest')} className="btn btn-accent">Go to home</button>
        </div>
    );
};

export default PaymentSuccess;
