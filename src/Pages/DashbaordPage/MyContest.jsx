import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GrView } from "react-icons/gr";

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
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/contest/${id}`);

            if (res.data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Parcel removed successfully.",
                    icon: "success",
                });

                await refetch();
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Failed to delete parcel.${error}`,
                icon: "error",
            });
        }
    };

    const handleEdit = async (id, currentName, currentType) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit Contest",
            html:
                `<input id="swal-name" class="swal2-input" placeholder="Contest Name" value="${currentName}">` +
                `<input id="swal-type" class="swal2-input" placeholder="Contest Type" value="${currentType}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const name = document.getElementById("swal-name").value;
                const type = document.getElementById("swal-type").value;
                if (!name || !type) {
                    Swal.showValidationMessage("Both fields are required");
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
                Swal.fire({
                    title: "Updated!",
                    text: "Contest updated successfully.",
                    icon: "success",
                });
                await refetch();
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Failed to update contest. ${error}`,
                icon: "error",
            });
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading contests...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

    return (
        <>
            <section className="container mx-auto mt-10 flex flex-col gap-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">My Created Contests</h2>
                    <button
                        onClick={() => navigate("/dashboard/create-contest")}
                        className="btn btn-info text-white flex items-center gap-2"
                    >
                        <AiOutlinePlusCircle />
                        Create New Contest
                    </button>
                </div>

                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>CONTEST NAME</th>
                                <th>TYPE</th>
                                <th>SUBMISSION DEADLINE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contestData.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        No contests found.
                                    </td>
                                </tr>
                            ) : (
                                contestData.map((contest) => (
                                    <tr key={contest._id}>
                                        <th>
                                            {contest.name.slice(0, 20)}
                                            {contest.name.length > 20 ? "..." : ""}
                                        </th>
                                        <td>{contest.contestType}</td>
                                        <td>{new Date(contest.deadline).toLocaleDateString()}</td>
                                        <td
                                            className={`${
                                                contest.status === "pending"
                                                    ? "text-amber-600 font-semibold"
                                                    : "text-green-500 font-semibold"
                                            }`}
                                        >
                                            {contest.status}
                                        </td>
                                        <td className="flex items-center gap-3">
                                            <button
                                                className="btn btn-sm bg-red-500 text-white"
                                                onClick={() => handleDelete(contest._id)}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    handleEdit(contest._id, contest.name, contest.contestType)
                                                }
                                            >
                                                <FiEdit3 />
                                            </button>
                                            <button onClick={()=>navigate(`/contest/${contest._id}`)} className="btn btn-sm btn-accent">
                                                <GrView />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default MyContest;
