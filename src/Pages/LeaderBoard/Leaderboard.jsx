import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AiFillTrophy } from "react-icons/ai";
import TopPerformers from "./TopPerformers";

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: leaders = [], isLoading } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leaderboard");
            return res.data;
        },
    });

    const sortedLeaders = [...leaders].sort((a, b) => b.wins - a.wins);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
            <title>Leaderboard - ContestHub</title>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <AiFillTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">Leaderboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">See who’s leading the pack</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin h-16 w-16 rounded-full border-t-4 border-primary-600" />
                    </div>
                ) : sortedLeaders.length > 0 ? (
                    <>
                        {/* Top Performers */}
                        <TopPerformers leaders={sortedLeaders.slice(0, 3)} />

                        {/* Leaderboard Table */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Rank</th>
                                        <th className="px-6 py-4 text-left">User</th>
                                        <th className="px-6 py-4 text-center">Wins</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y dark:divide-gray-700">
                                    {sortedLeaders.map((leader, index) => (
                                        <tr key={leader._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 font-semibold">#{index + 1}</td>

                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <img
                                                    src={leader.photoURL || "https://via.placeholder.com/50"}
                                                    alt={leader.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {leader.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{leader.email}</p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center font-bold text-primary-600">
                                                {leader.wins}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        index === 0
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : index === 1
                                                            ? "bg-gray-100 text-gray-800"
                                                            : index === 2
                                                            ? "bg-orange-100 text-orange-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                                >
                                                    {index === 0
                                                        ? "Champion"
                                                        : index === 1
                                                        ? "Runner-up"
                                                        : index === 2
                                                        ? "Third Place"
                                                        : "Competitor"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No Winners Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">Be the first to win a contest!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
