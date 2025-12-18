import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // ← Add useQueryClient
import { FaArrowLeft } from "react-icons/fa";
import ContestTimeCount from "../../Components/Contest/ContestTimeCount";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Utils/Loading";
import { useState } from "react";
import SubmitTaskModal from "../../Components/Modal/SubmitTaskModal";
import ContestTab from "../../Components/Contest/ContestTab";

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [openSubmit, setOpenSubmit] = useState(false);

    const {
        data: contest,
        isLoading: contestLoading,
        error: contestError,
    } = useQuery({
        queryKey: ["contest", id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${id}`);
            return res.data.contest;
        },
    });

    const { data: paymentStatus = {}, isLoading: paymentLoading } = useQuery({
        queryKey: ["payment-check", id, user?.email],
        enabled: !!id && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/check/${id}`);
            return res.data;
        },
    });

    const { data: submissionStatus = {}, isLoading: submissionLoading } = useQuery({
        queryKey: ["submission-check", id, user?.email],
        enabled: !!id && !!user?.email && paymentStatus.isRegistered,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/user/${id}`);
            return res.data;
        },
    });

    const isRegistered = paymentStatus.isRegistered;
    const hasSubmitted = submissionStatus.hasSubmitted;
    const deadlinePassed = contest && new Date(contest.deadline) < new Date();

    if (authLoading || contestLoading || paymentLoading || submissionLoading) return <Loading />;

    if (contestError || !contest) {
        return (
            <div className="container mx-auto py-16 text-center">
                <h2 className="text-2xl text-red-600">Contest not found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 btn btn-outline">
                    Go Back
                </button>
            </div>
        );
    }

    const handleSubmissionSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["submission-check", id, user?.email],
        });
        queryClient.invalidateQueries({
            queryKey: ["payment-check", id, user?.email],
        });
        setOpenSubmit(false);
    };
    console.log(contest);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 text-primary hover:underline">
                <FaArrowLeft /> Back to Contests
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="lg:col-span-8 space-y-6">
                        {/* Banner image */}
                        <div className="rounded-xl overflow-hidden shadow">
                            <img src={contest.image} alt="Contest Banner" className="w-full h-64 object-cover" />
                        </div>

                        <div>
                            <button className="btn btn-outline btn-primary">{contest.contestType}</button>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
                            <p className="text-gray-600">
                                A contest to find the most innovative and modern logo for a new tech startup.
                            </p>
                        </div>

                        <ContestTab contest={contest} />

                        {contest.status === "confirmed" && contest.winner && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4">
                                <img
                                    src={contest.winner.photo || "/avatar.png"}
                                    alt={contest.winner.name}
                                    className="w-12 h-12 rounded-full object-cover border"
                                />
                                <div>
                                    <h4 className="font-semibold text-green-800">🏆 Winner</h4>
                                    <p className="text-sm text-green-700">{contest.winner.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-8">
                        <ContestTimeCount
                            contest={contest}
                            isRegistered={isRegistered}
                            deadlinePassed={deadlinePassed}
                            contestId={contest._id}
                            onSubmitTask={() => setOpenSubmit(true)}
                            hasSubmitted={hasSubmitted}
                        />
                    </div>
                </div>
            </div>

            {openSubmit && (
                <SubmitTaskModal
                    contestId={contest._id}
                    onClose={() => setOpenSubmit(false)}
                    onSuccess={handleSubmissionSuccess}
                />
            )}
        </div>
    );
};

export default ContestDetails;
