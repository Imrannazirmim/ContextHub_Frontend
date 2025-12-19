import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiSearch } from "react-icons/fi";

// Debounce hook
const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useMemo(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ["leaderboard", currentPage, debouncedSearch],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: pageSize.toString(),
            });
            if (debouncedSearch.trim()) params.append("search", debouncedSearch.trim());
            const res = await axiosSecure.get(`/leaderboard?${params}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const leaderboard = useMemo(() => data?.leaderboard || [], [data]);
    const pagination = useMemo(() => data?.pagination || { total: 0, totalPages: 1 }, [data]);
    const { total = 0, totalPages = 1 } = pagination;

    const isFirstPage = currentPage === 1 && !debouncedSearch;

    const { topThree} = useMemo(() => {
        if (!isFirstPage) return { topThree: [], rankings: leaderboard };
        const sorted = [...leaderboard];
        return {
            topThree: sorted.slice(0, 3),
            rankings: sorted.slice(3),
        };
    }, [leaderboard, isFirstPage]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20">
                <p className="text-red-600 text-xl">Error loading leaderboard: {error.message}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
                    Retry
                </button>
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Leaderboard</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">See who's leading the pack in ContestHub.</p>
            </div>

            {/* Top 3 Podium */}
            {isFirstPage && topThree.length > 0 && (
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                        Top Performers
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {topThree.map((user, index) => (
                            <div
                                key={user._id || user.email}
                                className="border h-42 w-42 border-gray-300 flex flex-col p-4 rounded-2xl"
                            >
                                <div className="relative inline-block">
                                    {index === 0 && (
                                        <div className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl opacity-60 -z-10"></div>
                                    )}
                                    <img
                                        src={user.photoURL || `https://i.pravatar.cc/200?u=${user.email}`}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </div>
                                <h3
                                    className={`mt-6 text-2xl font-bold text-gray-800 dark:text-white ${
                                        index === 0 ? "text-yellow-600 mt-8 text-3xl" : ""
                                    }`}
                                >
                                    {user.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Search + Rankings */}
            <section>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {isFirstPage ? "All Rankings" : "Rankings"}
                    </h2>
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

                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Wins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-20 text-gray-500 text-xl">
                                            {debouncedSearch
                                                ? "No users found matching your search."
                                                : "No winners yet. Be the first!"}
                                        </td>
                                    </tr>
                                ) : (
                                    leaderboard.map((user, index) => (
                                        <tr
                                            key={user._id || user.email}
                                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                                        >
                                            <td className="font-semibold">{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-5">
                                                    <div className="relative">
                                                        <img
                                                            src={
                                                                user.photoURL ||
                                                                `https://i.pravatar.cc/80?u=${user.email}`
                                                            }
                                                            alt={user.name}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-bold text-gray-800 dark:text-white">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">
                                                    {user.wins}
                                                </p>
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
                                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, total)}{" "}
                                of {total} winners
                            </p>
                            <div className="join">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="join-item btn btn-sm"
                                >
                                    Previous
                                </button>
                                <button className="join-item btn btn-sm btn-active">{currentPage}</button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
