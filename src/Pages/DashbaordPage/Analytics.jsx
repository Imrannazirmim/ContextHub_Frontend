import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, Cell } from "recharts";

const Analytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/analytics");
            return res.data;
        },
    });

    const { stats = {}, recentContests = [] } = data;

    const { totalContests = 0, totalUsers = 0, totalRevenue = 0, totalParticipants = 0 } = stats;

    const revenueTrendData = [
        { month: "Earlier", revenue: totalRevenue * 0.6 },
        { month: "Recent", revenue: totalRevenue },
    ];

    const categoryCount = recentContests.reduce((acc, contest) => {
        const type = contest.contestType || "Unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const barData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
    }));

    const topCategory =
        barData.length > 0
            ? barData.reduce((prev, curr) => (prev.value > curr.value ? prev : curr))
            : { name: "N/A", value: 0 };

    if (isLoading) {
        return <div className="text-center py-20 text-xl ">Loading analytics...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold ">Analytics Dashboard</h1>
                    <p className=" mt-2">Platform-wide statistics for Admins.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <select className="select select-bordered w-48">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last year</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Contests</p>
                    <p className="text-4xl font-bold mt-2">{totalContests}</p>
                    <p className="text-green-600 text-sm mt-2">All time</p>
                </div>

                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
                    <p className="text-4xl font-bold mt-2">{totalUsers}</p>
                    <p className="text-gray-600 text-sm mt-2">Registered</p>
                </div>

                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-4xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mt-2">From entry fees</p>
                </div>

                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Participants</p>
                    <p className="text-4xl font-bold mt-2">{totalParticipants}</p>
                    <p className="text-amber-600 text-sm mt-2">Across all contests</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 ">
                    <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueTrendData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className=" rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">Contests by Category</h3>
                        <p className=" text-sm">
                            Top: <span className="font-semibold">{topCategory.name}</span> ({topCategory.value}{" "}
                            contests)
                        </p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className=" rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold">Recent Contests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Contest Name</th>
                                <th>Type</th>
                                <th>Creator Email</th>
                                <th>Participants</th>
                                <th>Prize</th>
                                <th>Status</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentContests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-12">
                                        No recent contests found.
                                    </td>
                                </tr>
                            ) : (
                                recentContests.map((contest) => (
                                    <tr key={contest._id} >
                                        <td className="py-4 px-6 font-medium max-w-xs truncate">{contest.name}</td>
                                        <td>{contest.contestType || "N/A"}</td>
                                        <td>{contest.creatorEmail}</td>
                                        <td>{contest.participantsCount || 0}</td>
                                        <td>${contest.prize || 0}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    contest.status === "completed"
                                                        ? "badge-info"
                                                        : contest.status === "pending"
                                                        ? "badge-warning"
                                                        : "badge-success"
                                                }`}
                                            >
                                                {contest.status || "unknown"}
                                            </span>
                                        </td>
                                        <td >{new Date(contest.deadline).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
