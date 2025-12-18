import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: usersData = {}, isLoading, refetch } = useQuery({
        queryKey: ["admin-users", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/users?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const { users = [], pagination = {} } = usersData;
    const { totalPages = 1 } = pagination;

    const handleRoleChange = async (userId, newRole) => {
        const result = await Swal.fire({
            title: "Change Role?",
            text: `Set this user to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            await axiosSecure.patch(`/admin/users/${userId}/role`, { role: newRole });
            refetch();
            Swal.fire("Updated!", "User role changed.", "success");
        }
    };

    if (isLoading) return <div className="text-center py-20">Loading users...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="flex items-center gap-3">
                                    <img src={user.photoURL || "https://i.pravatar.cc/40"} alt="" className="w-10 h-10 rounded-full" />
                                    <span>{user.name}</span>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === "admin" ? "badge-error" : user.role === "creator" ? "badge-warning" : "badge-success"}`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="select select-sm select-bordered"
                                    >
                                        <option value="user">User</option>
                                        <option value="creator">Creator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-ghost"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageUser;