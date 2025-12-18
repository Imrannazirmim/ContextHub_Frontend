import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // ← Add useQueryClient
import { FaArrowLeft } from "react-icons/fa";
import ContestTimeCount from "../../Components/Contest/ContestTimeCount";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Utils/Loading";
import { useState } from "react";
import SubmitTaskModal from "../../Components/Modal/SubmitTaskModal";

const ContestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); // ← Add this

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

    // ← Add submission check query
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

    // ← Function to pass to modal for refetching
    const handleSubmissionSuccess = () => {
        // Immediately refetch the submission status
        queryClient.invalidateQueries({
            queryKey: ["submission-check", id, user?.email],
        });
        // Optional: also refetch payment in case of edge cases
        queryClient.invalidateQueries({
            queryKey: ["payment-check", id, user?.email],
        });
        setOpenSubmit(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 text-primary hover:underline">
                <FaArrowLeft /> Back to Contests
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">{/* ... your existing content ... */}</div>

                {/* Sidebar */}
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

            {/* Submit Task Modal */}
            {openSubmit && (
                <SubmitTaskModal
                    contestId={contest._id}
                    onClose={() => setOpenSubmit(false)}
                    onSuccess={handleSubmissionSuccess} // ← Pass this
                />
            )}
        </div>
    );
};

export default ContestDetails;
