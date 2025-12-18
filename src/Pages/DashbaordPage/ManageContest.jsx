// src/Pages/DashbaordPage/ManageContest.jsx

import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Utils/Loading";
import { FiSearch, FiCheckCircle, FiXCircle, FiTrash2, FiUsers } from "react-icons/fi";

const ManageContest = () => {
    const axiosSecure = useAxiosSecure();

    const [rawSearchTerm, setRawSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const limit = 10;

    // Smooth typing — no lag!
    const searchTerm = useDeferredValue(rawSearchTerm.trim());

    const {
        data: response = {},
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["admin-contests", page, searchTerm, statusFilter],
        queryFn: async () => {
            let url = `/admin/contest?page=${page}&limit=${limit}`;
            if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
            if (statusFilter !== "all") url += `&status=${statusFilter}`;

            const res = await axiosSecure.get(url);
            return res.data;
        },
        keepPreviousData: true,
        staleTime: 20000,
    });

    const { contests = [], pagination = {} } = response;
    const { total = 0, totalPages = 1 } = pagination;

    // Fixed CRUD operations
    const handleAction = async (id, action) => {
        const actionMessages = {
            approve: { title: "Approve Contest?", text: "This contest will be confirmed." },
            reject: { title: "Reject Contest?", text: "This contest will be rejected." },
            delete: { title: "Delete Contest?", text: "This action cannot be undone!" },
        };

        const result = await Swal.fire({
            title: actionMessages[action].title,
            text: actionMessages[action].text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: action === "delete" ? "#ef4444" : "#10b981",
            confirmButtonText: action.charAt(0).toUpperCase() + action.slice(1),
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        const endpoints = {
            approve: `/admin/contest/${id}/approve`,
            reject: `/admin/contest/${id}/reject`,
            delete: `/admin/contest/${id}`,
        };

        try {
            await axiosSecure.patch(endpoints[action]);
            refetch(); // Refresh list
            Swal.fire("Success!", `Contest has been ${action}d.`, "success");
        } catch (error) {
            console.error("Action failed:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong";
            Swal.fire("Error!", errorMsg, "error");
        }
    };

    if (isLoading && page === 1) return <Loading />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Contests</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    View, approve, reject, or delete all contests on the platform.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        className="input input-bordered w-full pl-12 pr-4"
                        value={rawSearchTerm}
                        onChange={(e) => setRawSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    />
                </div>

                <select
                    className="select select-bordered w-full lg:w-64"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Loading Indicator */}
            {isFetching && (
                <div className="flex justify-center my-6">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            )}

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="text-left py-4 px-6">Contest</th>
                                <th className="text-left py-4 px-6">Creator</th>
                                <th className="text-left py-4 px-6">Type</th>
                                <th className="text-left py-4 px-6">Status</th>
                                <th className="text-left py-4 px-6">Deadline</th>
                                <th className="text-left py-4 px-6">Participants</th>
                                <th className="text-left py-4 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-16 text-gray-500 text-lg">
                                        No contests found.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest) => (
                                    <tr
                                        key={contest._id}
                                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={contest.image || "https://via.placeholder.com/80"}
                                                    alt={contest.name}
                                                    className="w-14 h-14 rounded-lg object-cover shadow"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                                        {contest.name?.length > 30
                                                            ? contest.name.slice(0, 30) + "..."
                                                            : contest.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Prize: ${contest.prize || contest.prizeMoney || 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={contest.creatorPhoto || "https://i.pravatar.cc/40"}
                                                    alt={contest.creatorName}
                                                    className="w-9 h-9 rounded-full"
                                                />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {contest.creatorName ||
                                                        contest.creatorEmail?.split("@")[0] ||
                                                        "Unknown"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-5 px-6 text-gray-600 dark:text-gray-400">
                                            {contest.contestType || "-"}
                                        </td>

                                        <td className="py-5 px-6">
                                            <span
                                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    contest.status === "confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : contest.status === "pending"
                                                        ? "bg-orange-100 text-orange-800"
                                                        : contest.status === "rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {contest.status}
                                            </span>
                                        </td>

                                        <td className="py-5 px-6 text-gray-600 dark:text-gray-400">
                                            {contest.deadline
                                                ? new Date(contest.deadline).toLocaleDateString("en-US", {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric",
                                                  })
                                                : "-"}
                                        </td>

                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <FiUsers className="text-gray-500" />
                                                <span className="font-bold text-lg">
                                                    {contest.participantsCount || 0}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-5 px-6">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Link
                                                    to={`/dashboard/my-submission/${contest._id}`}
                                                    className="btn btn-info btn-sm tooltip"
                                                    data-tip="View Submissions"
                                                >
                                                    <FiUsers className="text-lg" />
                                                </Link>

                                                {contest.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(contest._id, "approve")}
                                                            className="btn btn-success btn-sm tooltip"
                                                            data-tip="Approve"
                                                        >
                                                            <FiCheckCircle className="text-lg" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(contest._id, "reject")}
                                                            className="btn btn-warning btn-sm tooltip"
                                                            data-tip="Reject"
                                                        >
                                                            <FiXCircle className="text-lg" />
                                                        </button>
                                                    </>
                                                )}

                                                <button
                                                    onClick={() => handleAction(contest._id, "delete")}
                                                    className="btn btn-error btn-sm tooltip"
                                                    data-tip="Delete"
                                                >
                                                    <FiTrash2 className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center py-6 px-6 bg-gray-50 dark:bg-gray-700 gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} contests
                        </p>
                        <div className="join">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1 || isFetching}
                                className="join-item btn btn-sm"
                            >
                                Previous
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = i + 1 + Math.max(0, page - 3);
                                if (pageNum > totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        disabled={isFetching}
                                        className={`join-item btn btn-sm ${page === pageNum ? "btn-active" : ""}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages || isFetching}
                                className="join-item btn btn-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContest;
