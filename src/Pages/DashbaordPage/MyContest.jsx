import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { FaTasks } from "react-icons/fa"; // New icon for submissions
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        data: contestData = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["my-contest", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/my/created?email=${user.email}`);
            return res.data.contests;
        },
    });

    contestData;

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/contest/${id}`);

            if (res.data.deletedCount > 0) {
                Swal.fire("Deleted!", "Contest has been deleted.", "success");
                refetch();
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to delete contest.", error.message);
        }
    };

    const handleEdit = async (id, currentName, currentType) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit Contest",
            html: `
                <input id="swal-name" class="swal2-input" placeholder="Contest Name" value="${currentName}">
                <input id="swal-type" class="swal2-input" placeholder="Contest Type" value="${currentType}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const name = document.getElementById("swal-name").value.trim();
                const type = document.getElementById("swal-type").value.trim();
                if (!name || !type) {
                    Swal.showValidationMessage("Both fields are required");
                    return false;
                }
                return { name, type };
            },
        });

        if (!formValues) return;

        try {
            const res = await axiosSecure.patch(`/contest/${id}`, {
                name: formValues.name,
                contestType: formValues.type,
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Contest updated successfully.", "success");
                refetch();
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to update contest.", error.message);
        }
    };

    if (isLoading) return <p className="text-center mt-10 text-xl">Loading contests...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

    return (
        <section className="container mx-auto mt-10 flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold ">My Created Contests</h2>
                <button
                    onClick={() => navigate("/dashboard/create-contest")}
                    className="btn btn-info text-white flex items-center gap-2 hover:scale-105 transition"
                >
                    <AiOutlinePlusCircle className="text-xl" />
                    Create New Contest
                </button>
            </div>

            <div className="overflow-x-auto ">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>CONTEST NAME</th>
                            <th>TYPE</th>
                            <th>DEADLINE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12  text-lg">
                                    No contests created yet. Click "Create New Contest" to get started!
                                </td>
                            </tr>
                        ) : (
                            contestData.map((contest) => (
                                <tr key={contest._id} className="transition">
                                    <td className="py-4 px-6 font-medium">
                                        {contest.name.length > 25 ? `${contest.name.slice(0, 25)}...` : contest.name}
                                    </td>
                                    <td className="py-4 px-6">{contest.contestType}</td>
                                    <td className="py-4 px-6">
                                        {new Date(contest.deadline).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                contest.status === "confirmed"
                                                    ? "bg-green-100 text-green-800"
                                                    : contest.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {contest.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            {/* View Public Contest Page */}
                                            <button
                                                onClick={() => navigate(`/contest/${contest._id}`)}
                                                className="btn btn-sm btn-accent tooltip"
                                                data-tip="View Public Page"
                                            >
                                                <GrView />
                                            </button>

                                            {/* View Submissions (Creator Only) */}
                                            <button
                                                onClick={() => navigate(`/dashboard/my-submission/${contest._id}`)}
                                                className="btn btn-sm btn-success text-white tooltip"
                                                data-tip="View Submissions"
                                            >
                                                <FaTasks />
                                            </button>

                                            {/* Edit */}
                                            <button
                                                onClick={() =>
                                                    handleEdit(contest._id, contest.name, contest.contestType)
                                                }
                                                className="btn btn-sm btn-primary tooltip"
                                                data-tip="Edit Contest"
                                                disabled={contest.status !== "pending"} // Optional: disable if not pending
                                            >
                                                <FiEdit3 />
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(contest._id)}
                                                className="btn btn-sm btn-error text-white tooltip"
                                                data-tip="Delete Contest"
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyContest;
