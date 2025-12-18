import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MySubmission = () => {
    const { contestId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    // if (!contestId) {
    //     return (
    //         <div className="text-center py-20">
    //             <h2 className="text-3xl font-bold text-red-600">Invalid Contest</h2>
    //             <p className="mt-4">No contest selected.</p>
    //             <button onClick={() => navigate("/dashboard/my-contest")} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
    //                 Go to My Contests
    //             </button>
    //         </div>
    //     );
    // }

    const { data: contest, isLoading: contestLoading } = useQuery({
        queryKey: ["contest", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/${contestId}`);
            return res.data.contest;
        },
    });

    const { data: submissionsResponse = {}, isLoading: submissionsLoading } = useQuery({
        queryKey: ["submissions", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/contest/${contestId}`);
            return res.data;
        },
    });

    const submissions = submissionsResponse.submissions || [];

    const declareWinnerMutation = useMutation({
        mutationFn: async ({ winnerEmail, winnerName, winnerPhoto }) => {
            return axiosSecure.patch(`/contests/${contestId}/winner`, {
                winnerEmail,
                winnerName,
                winnerPhoto: winnerPhoto || "",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["contest", contestId]);
            queryClient.invalidateQueries(["submissions", contestId]);
            Swal.fire("Success", "Winner declared!", "success");
        },
    });

    const handleDeclareWinner = (email, name, photo) => {
        if (contest?.winner) return Swal.fire("Already Declared", "Winner already chosen.", "info");
        if (new Date() < new Date(contest.deadline)) return Swal.fire("Wait", "Contest not ended yet.", "warning");

        Swal.fire({
            title: "Declare Winner?",
            text: `Declare ${name} as winner?`,
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                declareWinnerMutation.mutate({ winnerEmail: email, winnerName: name, winnerPhoto: photo });
            }
        });
    };

    if (contestLoading || submissionsLoading) return <div className="text-center py-20">Loading...</div>;
    if (!contest) return <div className="text-center py-20">Contest not found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/dashboard/my-contest")}
                className="flex items-center gap-2 mb-6 text-blue-600 hover:underline"
            >
                <FiArrowLeft /> Back to My Contests
            </button>

            <h1 className="text-3xl font-bold mb-6">Submitted Tasks - {contest.name}</h1>

            {contest.winner && (
                <div className="bg-green-100 p-6 rounded-lg mb-8 flex items-center gap-4">
                    <FaTrophy className="text-4xl text-yellow-600" />
                    <div>
                        <h3 className="text-2xl font-bold">Winner: {contest.winner.name}</h3>
                        <p>{contest.winner.email}</p>
                    </div>
                </div>
            )}

            {submissions.length === 0 ? (
                <p className="text-center text-xl py-20">No submissions yet.</p>
            ) : (
                <div className="space-y-6">
                    {submissions.map((sub, idx) => (
                        <div key={sub._id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-blue-600">#{idx + 1}</span>
                                    <img
                                        src={sub.userPhoto || "https://i.pravatar.cc/60?u=" + sub.userEmail}
                                        alt={sub.userName}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">{sub.userName}</h3>
                                        <p className="text-gray-600">{sub.userEmail}</p>
                                    </div>
                                </div>
                                {!contest.winner && (
                                    <button
                                        onClick={() => handleDeclareWinner(sub.userEmail, sub.userName, sub.userPhoto)}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
                                    >
                                        <FaTrophy /> Declare Winner
                                    </button>
                                )}
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                                <p className="whitespace-pre-wrap">{sub.submittedTask}</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Submitted: {new Date(sub.submittedAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySubmission;
