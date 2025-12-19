import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Swal from "sweetalert2";
import { FiEdit3, FiMail, FiAward, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { FaTrophy, FaChartPie } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const { data: stats } = useQuery({
        queryKey: ["userStats"],
        queryFn: () => axiosSecure.get("/stats/user").then((r) => r.data),
    });

    const { data: userData } = useQuery({
        queryKey: ["userData", user?.email],
        enabled: !!user?.email,
        queryFn: () => axiosSecure.get(`/users/${user.email}`).then((r) => r.data.user),
    });

    const updateMutation = useMutation({
        mutationFn: async (formData) => {
            await updateUserProfile(formData.name, formData.photoURL);
            return axiosSecure
                .patch(`/users/${user.email}`, {
                    name: formData.name,
                    photoURL: formData.photoURL,
                    bio: formData.bio,
                })
                .then((r) => r.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userData"]);
            Swal.fire({ icon: "success", title: "Profile updated!", timer: 1800, showConfirmButton: false });
            setIsEditing(false);
        },
        onError: (err) =>
            Swal.fire({
                icon: "error",
                title: "Update failed",
                text: err.response?.data?.message || "Something went wrong",
            }),
    });
  

    const onSubmit = (data) => updateMutation.mutate(data);

    const chartData = [
        { name: "Wins", value: stats?.won || 0 },
        { name: "Losses", value: (stats?.participated || 0) - (stats?.won || 0) },
    ];
    const COLORS = ["#10b981", "#f43f5e"];

    return (
        <main className="container mx-auto pt-10">
            <title>My Profile – ContestHub</title>

            {/* Page header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-base-content">My Profile</h1>
                <p className="text-base-content/70">Manage your account information and track your performance</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 ">
                        <div className="card-body">
                            <div className="flex items-start justify-between">
                                <h2 className="card-title">Profile Information</h2>
                                {!isEditing && (
                                    <button className="btn btn-sm btn-primary" onClick={() => setIsEditing(true)}>
                                        <FiEdit3 className="mr-2" /> Edit
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={userData?.name}
                                            {...register("name", { required: "Name is required" })}
                                            className="input input-bordered"
                                        />
                                        {errors.name && (
                                            <span className="text-error text-sm">{errors.name.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>
                                        <input
                                            type="url"
                                            defaultValue={userData?.photoURL}
                                            {...register("photoURL", { required: "Photo URL is required" })}
                                            className="input input-bordered"
                                        />
                                        {errors.photoURL && (
                                            <span className="text-error text-sm">{errors.photoURL.message}</span>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Bio</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            defaultValue={userData?.bio || ""}
                                            {...register("bio")}
                                            placeholder="A short bio..."
                                            className="textarea textarea-bordered"
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={updateMutation.isPending}
                                            className="btn btn-primary flex-1"
                                        >
                                            {updateMutation.isPending ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="btn btn-ghost flex-1"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src={
                                                    user?.photoURL ||
                                                    "https://ui-avatars.com/api/?name=" + userData?.name
                                                }
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{userData?.name}</h3>
                                        <div className="flex items-center gap-2 text-base-content/70 mt-1">
                                            <FiMail /> {userData?.email}
                                        </div>
                                        <div className="badge badge-primary mt-2 capitalize">{userData?.role}</div>
                                    </div>
                                </div>
                            )}

                            {!isEditing && userData?.bio && (
                                <div className="pt-4 border-t border-base-300 mt-4">
                                    <h4 className="font-semibold mb-1">Bio</h4>
                                    <p className="text-base-content/80">{userData.bio}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Stats */}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title flex items-center gap-2">
                                <FiTrendingUp /> Statistics
                            </h2>
                            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                    <p className="text-sm text-base-content/70">Participated</p>
                                    <p className="text-2xl font-bold text-blue-600">{stats?.participated || 0}</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                    <p className="text-sm text-base-content/70">Won</p>
                                    <p className="text-2xl font-bold text-green-600">{stats?.won || 0}</p>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                    <p className="text-sm text-base-content/70">Win Rate</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats?.winPercentage || 0}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pie */}
                    {(stats?.participated || 0) > 0 && (
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title flex items-center gap-2">
                                    <FaChartPie /> Win / Loss Ratio
                                </h2>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {chartData.map((_, idx) => (
                                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
export default UserProfile;
