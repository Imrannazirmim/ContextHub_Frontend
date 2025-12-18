// Pages/LeaderBoard/Leaderboard.jsx
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiSearch } from "react-icons/fi";

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data, isLoading, error } = useQuery({
        queryKey: ["leaderboard", currentPage, searchTerm],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: pageSize.toString(),
            });
            if (searchTerm.trim()) {
                params.append("search", searchTerm.trim());
            }
            const res = await axiosSecure.get(`/leaderboard?${params}`);
            return res.data; // { leaderboard: [], pagination: { total, totalPages } }
        },
        keepPreviousData: true,
    });

    // SAFE: Default to empty object/array
    const leaderboard = data?.leaderboard || [];
    const pagination = data?.pagination || { total: 0, totalPages: 1 };
    const { total = 0, totalPages = 1 } = pagination;

    // Memoized top 3 and rest
    const { topThree, rankings } = useMemo(() => {
        const sorted = [...leaderboard];
        return {
            topThree: sorted.slice(0, 3),
            rankings: sorted.slice(3),
        };
    }, [leaderboard]);

    const getMedal = (rank) => {
        switch (rank) {
            case 1: return { emoji: "🏆", color: "text-yellow-500", border: "border-yellow-400" };
            case 2: return { emoji: "🥈", color: "text-gray-400", border: "border-gray-300" };
            case 3: return { emoji: "🥉", color: "text-orange-600", border: "border-orange-400" };
            default: return null;
        }
    };

    const getRankDisplay = (index) => {
        const rank = index + 1;
        const medal = getMedal(rank);
        if (medal) {
            return <span className={`text-4xl ${medal.color}`}>{medal.emoji}</span>;
        }
        return <span className="text-xl font-bold text-gray-600 dark:text-gray-400">{rank}</span>;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 text-xl">Error loading leaderboard: {error.message}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Leaderboard</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">See who's leading the pack in ContestHub.</p>
            </div>

            {/* Top 3 Podium */}
            {topThree.length > 0 && (
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Top Performers</h2>
                    <div className="flex flex-col lg:flex-row items-end justify-center gap-8 lg:gap-16">
                        {/* 2nd Place */}
                        {topThree[1] && (
                            <div className="order-1 lg:order-1 text-center">
                                <div className="relative inline-block">
                                    <img
                                        src={topThree[1].photoURL || `https://i.pravatar.cc/200?u=${topThree[1].email}`}
                                        alt={topThree[1].name}
                                        className="w-36 h-36 rounded-full object-cover border-6 shadow-2xl"
                                        style={{ borderColor: "#9ca3af" }}
                                    />
                                    <div className="absolute -top-6 -right-6 text-5xl">🥈</div>
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">{topThree[1].name}</h3>
                                <p className="text-4xl font-extrabold text-gray-700 dark:text-gray-300 mt-2">{topThree[1].wins}</p>
                                <p className="text-lg text-gray-500 mt-1">Wins</p>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mt-4">2nd Place</p>
                            </div>
                        )}

                        {/* 1st Place */}
                        {topThree[0] && (
                            <div className="order-3 lg:order-2 text-center transform lg:scale-125">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl opacity-60 -z-10"></div>
                                    <img
                                        src={topThree[0].photoURL || `https://i.pravatar.cc/240?u=${topThree[0].email}`}
                                        alt={topThree[0].name}
                                        className="w-48 h-48 rounded-full object-cover border-8 border-yellow-400 shadow-2xl relative z-10"
                                    />
                                    <div className="absolute -top-8 -right-8 text-7xl animate-pulse">🏆</div>
                                </div>
                                <h3 className="mt-8 text-3xl font-bold text-yellow-600">{topThree[0].name}</h3>
                                <p className="text-6xl font-extrabold text-yellow-500 mt-3">{topThree[0].wins}</p>
                                <p className="text-2xl text-yellow-600 font-semibold mt-2">Wins</p>
                                <p className="text-3xl font-bold text-yellow-500 mt-6">1st Place</p>
                            </div>
                        )}

                        {/* 3rd Place */}
                        {topThree[2] && (
                            <div className="order-2 lg:order-3 text-center">
                                <div className="relative inline-block">
                                    <img
                                        src={topThree[2].photoURL || `https://i.pravatar.cc/200?u=${topThree[2].email}`}
                                        alt={topThree[2].name}
                                        className="w-36 h-36 rounded-full object-cover border-6 shadow-2xl"
                                        style={{ borderColor: "#fb923c" }}
                                    />
                                    <div className="absolute -top-6 -right-6 text-5xl">🥉</div>
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">{topThree[2].name}</h3>
                                <p className="text-4xl font-extrabold text-gray-700 dark:text-gray-300 mt-2">{topThree[2].wins}</p>
                                <p className="text-lg text-gray-500 mt-1">Wins</p>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mt-4">3rd Place</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* All Rankings */}
            <section>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">All Rankings</h2>
                    <div className="relative w-full lg:w-96">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full pl-12 py-3 text-lg"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                                <tr>
                                    <th className="text-left py-6 px-8 text-lg font-semibold">Rank</th>
                                    <th className="text-left py-6 px-8 text-lg font-semibold">User</th>
                                    <th className="text-right py-6 px-8 text-lg font-semibold">Wins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20 text-gray-500 text-xl">
                                            {searchTerm ? "No users found matching your search." : "No winners yet. Be the first!"}
                                        </td>
                                    </tr>
                                ) : (
                                    leaderboard.map((user, index) => (
                                        <tr
                                            key={user._id || user.email}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                                        >
                                            <td className="py-8 px-8">
                                                {getRankDisplay(index)}
                                            </td>
                                            <td className="py-8 px-8">
                                                <div className="flex items-center gap-5">
                                                    <div className="relative">
                                                        <img
                                                            src={user.photoURL || `https://i.pravatar.cc/80?u=${user.email}`}
                                                            alt={user.name}
                                                            className="w-16 h-16 rounded-full ring-4 ring-gray-200 dark:ring-gray-600 object-cover"
                                                        />
                                                        {index < 3 && (
                                                            <div className="absolute -top-2 -right-2 text-3xl">
                                                                {[null, "🏆", "🥈", "🥉"][index + 1]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-8 px-8 text-right">
                                                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{user.wins}</p>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t">
                            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                                {Math.min(currentPage * pageSize, total)} of {total} winners
                            </p>
                            <div className="join">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="join-item btn btn-sm"
                                >
                                    Previous
                                </button>
                                <button className="join-item btn btn-sm btn-active">{currentPage}</button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="join-item btn btn-sm"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Leaderboard;