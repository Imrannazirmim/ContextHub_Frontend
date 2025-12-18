// src/Pages/Dashboard/MyParticipated.jsx (Table Version)
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

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
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
                My Participated Contests ({myParticipatedContests.length})
            </motion.h1>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <table className="table w-full bg-white dark:bg-gray-800">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                        <tr>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Contest</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Type</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300 hidden md:table-cell">Prize</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300 hidden lg:table-cell">Entry Fee</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Deadline</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300 hidden sm:table-cell">Status</th>
                            <th className="text-left py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Registered</th>
                            <th className="text-center py-5 px-6 font-bold text-gray-700 dark:text-gray-300">Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {myParticipatedContests.map(({ participant, contest }, index) => (
                            <motion.tr
                                key={contest._id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-700"
                            >
                                {/* Contest Name + Image (Mobile Stacked) */}
                                <td className="py-6 px-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={contest.image}
                                            alt={contest.name}
                                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                                        />
                                        <div>
                                            <p className="font-bold text-lg line-clamp-2">{contest.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 md:hidden">
                                                Prize: ${contest.prize || contest.prizeMoney}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 lg:hidden">
                                                Fee: ${contest.entryFee || contest.price}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Type */}
                                <td className="py-6 px-6">
                                    <span className="badge badge-primary text-white px-4 py-2">
                                        {contest.contestType}
                                    </span>
                                </td>

                                {/* Prize (Hidden on mobile) */}
                                <td className="py-6 px-6 hidden md:table-cell">
                                    <span className="text-2xl font-bold text-green-600">
                                        ${contest.prize || contest.prizeMoney}
                                    </span>
                                </td>

                                {/* Entry Fee (Hidden on lg and below) */}
                                <td className="py-6 px-6 hidden lg:table-cell">
                                    <span className="font-semibold text-blue-600">
                                        ${contest.entryFee || contest.price}
                                    </span>
                                </td>

                                {/* Deadline */}
                                <td className="py-6 px-6">
                                    <span className={`font-medium ${new Date(contest.deadline) < new Date() ? "text-red-600" : "text-orange-600"}`}>
                                        {new Date(contest.deadline).toLocaleDateString()}
                                    </span>
                                </td>

                                {/* Status (Hidden on small screens) */}
                                <td className="py-6 px-6 hidden sm:table-cell">
                                    <span className={`badge ${contest.status === "confirmed" ? "badge-success" : contest.status === "completed" ? "badge-info" : "badge-warning"}`}>
                                        {contest.status.toUpperCase()}
                                    </span>
                                </td>

                                {/* Registered Date */}
                                <td className="py-6 px-6 text-sm">
                                    {new Date(participant.registeredAt).toLocaleDateString()}
                                </td>

                                {/* Action Button */}
                                <td className="py-6 px-6 text-center">
                                    <Link
                                        to={`/contest/${contest._id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="text-center mt-12">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Total Contests Participated: <span className="text-primary text-2xl">{myParticipatedContests.length}</span>
                </p>
            </div>
        </div>
    );
};

export default MyParticipated;