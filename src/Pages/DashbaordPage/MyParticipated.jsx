// src/Pages/Dashboard/MyParticipated.jsx (Table Version)
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const MyParticipated = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: participatedData = [], isLoading: participatedLoading } = useQuery({
        queryKey: ["my-participated", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participants/${user?.email}`);
            return res.data?.data || [];
        },
        enabled: !!user?.email,
    });

    const { data: allContestsResponse = {}, isLoading: contestsLoading } = useQuery({
        queryKey: ["all-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contest");
            return res.data;
        },
    });

    const allContests = allContestsResponse.contest || [];

    const myParticipatedContests = participatedData
        .map((participant) => {
            const contest = allContests.find((c) => c._id === participant.contestId);
            return contest ? { participant, contest } : null;
        })
        .filter(Boolean);

    const isLoading = authLoading || participatedLoading || contestsLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (myParticipatedContests.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <div className="text-8xl mb-6">🎯</div>
                <h2 className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-6">
                    No Participated Contests Yet!
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Join contests and start competing for amazing prizes!
                </p>
                <Link to="/contest" className="btn btn-primary btn-lg">
                    Browse Contests
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-semibold text-center my-10 text-purple-500">My Participated Contests</h2>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Contest</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Prize</th>
                            <th>Entry Fee</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Registered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myParticipatedContests.map(({ participant, contest }) => (
                            <tr key={contest._id}>
                                <td>
                                    <img
                                        className="w-16 h-16 rounded-lg object-cover"
                                        src={contest.image}
                                        alt={contest.name}
                                    />
                                </td>
                                <td>{contest.name}</td>
                                <td>{contest.contestType}</td>
                                <td>${contest.prize}</td>
                                <td>${contest.entryFee}</td>
                                <td>{new Date(contest.deadline).toLocaleDateString()}</td>
                                <td className="py-6 px-6 hidden sm:table-cell">
                                    <span
                                        className={`badge ${
                                            contest.status === "confirmed"
                                                ? "badge-success"
                                                : contest.status === "completed"
                                                ? "badge-info"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {contest.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="py-6 px-6 text-sm">
                                    {new Date(participant.registeredAt).toLocaleDateString()}
                                </td>
                                <td className="py-6 px-6 text-center flex items-center">
                                    <Link to={`/contest/${contest._id}`} className="btn btn-primary btn-sm">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-12">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Total Contests Participated:{" "}
                    <span className="text-primary text-2xl">{myParticipatedContests.length}</span>
                </p>
            </div>
        </div>
    );
};

export default MyParticipated;
