import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiSearch, FiCheckCircle, FiXCircle, FiTrash2 } from "react-icons/fi";
import { FaUsers, FaTrophy, FaClock } from "react-icons/fa";

const ManageContest = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: response = {}, isLoading, refetch } = useQuery({
        queryKey: ["admin-contests", page, searchTerm, statusFilter],
        queryFn: async () => {
            let url = `/admin/contest?page=${page}&limit=${limit}`;
            if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
            if (statusFilter !== "all") url += `&status=${statusFilter}`;
            const res = await axiosSecure.get(url);
            return res.data; 
        },
    });

    const { contests = [], pagination = {}, stats = {} } = response;
    const { total = 0, totalPages = 1 } = pagination;

    const totalContests = stats.totalContests || total;
    const pendingCount = stats.pendingCount || 0;
    const totalParticipants = stats.totalParticipants || 0;

    const handleAction = async (id, action) => {
        const messages = {
            approve: "approve",
            reject: "reject",
            delete: "delete",
        };

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `This will ${messages[action]} the contest.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: action === "delete" ? "#ef4444" : "#10b981",
            cancelButtonColor: "#6b7280",
        });

        if (result.isConfirmed) {
            const endpoint = action === "delete" ? `/admin/contest/${id}` : `/admin/contest/${id}/${action}`;
            await axiosSecure.patch(endpoint);
            refetch();
            Swal.fire("Success!", `Contest has been ${messages[action]}d.`, "success");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Contests</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Oversee, approve, and manage all contests on the platform.
                    </p>
                </div>
                <button className="btn btn-primary flex items-center gap-2 text-lg px-6">
                    + Create New Contest
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm">Total Contests</p>
                        <p className="text-4xl font-bold mt-2">{totalContests.toLocaleString()}</p>
                        <p className="text-blue-100 text-sm mt-2">+12% from last month</p>
                    </div>
                    <FaTrophy className="text-6xl opacity-30" />
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
                    <div>
                        <p className="text-orange-100 text-sm">Pending Approval</p>
                        <p className="text-4xl font-bold mt-2">{pendingCount}</p>
                        <p className="text-orange-100 text-sm mt-2">Requires Action</p>
                    </div>
                    <FaClock className="text-6xl opacity-30" />
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
                    <div>
                        <p className="text-pink-100 text-sm">Active Participants</p>
                        <p className="text-4xl font-bold mt-2">{totalParticipants.toLocaleString()}</p>
                        <p className="text-pink-100 text-sm mt-2">+24% from last month</p>
                    </div>
                    <FaUsers className="text-6xl opacity-30" />
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search by contest name or creator..."
                        className="input input-bordered w-full pl-12 pr-4 py-3 text-lg"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                <select
                    className="select select-bordered w-full lg:w-64 text-lg"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
                            <tr>
                                <th className="py-5 px-6 text-left">Contest Details</th>
                                <th className="py-5 px-6 text-left">Creator</th>
                                <th className="py-5 px-6 text-left">Status</th>
                                <th className="py-5 px-6 text-left">Deadline</th>
                                <th className="py-5 px-6 text-left">Participants</th>
                                <th className="py-5 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-gray-500 text-lg">
                                        No contests found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest) => (
                                    <tr key={contest._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={contest.image || "https://via.placeholder.com/80"}
                                                    alt={contest.name}
                                                    className="w-16 h-16 rounded-xl object-cover shadow"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                                        {contest.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {contest.contestType}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={contest.creatorPhoto || "https://i.pravatar.cc/40"}
                                                    alt={contest.creatorName}
                                                    className="w-10 h-10 rounded-full ring-2 ring-gray-300"
                                                />
                                                <span className="font-medium text-gray-800 dark:text-white">
                                                    {contest.creatorName || contest.creatorEmail || "Unknown Creator"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span
                                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    contest.status === "confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : contest.status === "pending"
                                                        ? "bg-orange-100 text-orange-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {contest.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-6 text-gray-700 dark:text-gray-300">
                                            {new Date(contest.deadline).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="text-gray-500" />
                                                <span className="font-bold text-lg text-gray-800 dark:text-white">
                                                    {contest.participantsCount || 0}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-3">
                                                {contest.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(contest._id, "approve")}
                                                            className="btn btn-success btn-sm rounded-full tooltip"
                                                            data-tip="Approve"
                                                        >
                                                            <FiCheckCircle className="text-xl" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(contest._id, "reject")}
                                                            className="btn btn-warning btn-sm rounded-full tooltip"
                                                            data-tip="Reject"
                                                        >
                                                            <FiXCircle className="text-xl" />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleAction(contest._id, "delete")}
                                                    className="btn btn-error btn-sm rounded-full tooltip"
                                                    data-tip="Delete"
                                                >
                                                    <FiTrash2 className="text-xl" />
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
                    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} results
                        </p>
                        <div className="join">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="join-item btn btn-sm"
                            >
                                Previous
                            </button>
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                const pageNum = i + 1 + Math.max(0, page - 3);
                                if (pageNum > totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        className={`join-item btn btn-sm ${page === pageNum ? "btn-active" : ""}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            {totalPages > 5 && page < totalPages - 2 && (
                                <>
                                    <button className="join-item btn btn-sm btn-disabled">...</button>
                                    <button onClick={() => setPage(totalPages)} className="join-item btn btn-sm">
                                        {totalPages}
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
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