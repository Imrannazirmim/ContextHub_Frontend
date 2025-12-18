import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { BarChart, Bar, Cell } from "recharts";

const Analytics = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch analytics data (create a backend endpoint /admin/analytics)
    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/analytics");
            return res.data; // Expected: { stats: {}, newUsers: [], categories: [], recentContests: [] }
        },
    });

    const { stats = {}, newUsers = [], categories = [], recentContests = [] } = data;

    const {
        totalContests = 1240,
        totalUsers = 8950,
        totalRevenue = 56780,
        last30DaysRevenue = 8120,
        userGrowth = 15.2,
        newUsersCount = 8950,
        newUsersGrowth = 10.1,
    } = stats;

    // Line chart data for new users
    const lineData = newUsers.length > 0 ? newUsers : [
        { week: "W1", users: 8000 },
        { week: "W2", users: 8500 },
        { week: "W3", users: 8200 },
        { week: "W4", users: 8950 },
    ];

    // Bar chart data for categories
    const barData = categories.length > 0 ? categories : [
        { name: "Design", value: 40 },
        { name: "Writing", value: 30 },
        { name: "Photo", value: 80 },
        { name: "Video", value: 20 },
        { name: "Music", value: 10 },
    ];

    const topCategory = barData.reduce((prev, current) => (prev.value > current.value ? prev : current));

    if (isLoading) {
        return <div className="text-center py-20 text-xl">Loading analytics...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Platform-wide statistics for Admins.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <select className="select select-bordered w-48">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last year</option>
                    </select>
                    <button className="btn btn-outline">Export</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Active Contests</p>
                    <p className="text-4xl font-bold mt-2">{totalContests.toLocaleString()}</p>
                    <p className="text-green-600 text-sm mt-2">+5.2%</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Platform Users</p>
                    <p className="text-4xl font-bold mt-2">{totalUsers.toLocaleString()}</p>
                    <p className="text-red-600 text-sm mt-2">-10.1%</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-4xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mt-2">Last 30 days: ${last30DaysRevenue.toLocaleString()}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">User Growth</p>
                    <p className="text-4xl font-bold mt-2">{userGrowth}%</p>
                    <p className="text-red-600 text-sm mt-2">-1.8%</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* New Users Line Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-xl font-bold">New Users</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {newUsersCount.toLocaleString()} Users
                                <span className="text-green-600 ml-2">+{newUsersGrowth}%</span>
                            </p>
                            <p className="text-gray-500 text-sm">Last 30 days</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={lineData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Categories Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold">Top Performing Categories</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            <span className="font-semibold">{topCategory.name}</span>
                            <span className="text-red-600 ml-2">-2.3%</span>
                        </p>
                        <p className="text-gray-500 text-sm">Last 30 days</p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Bar dataKey="value">
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.name === "Photo" ? "#3b82f6" : "#e5e7eb"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Contests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold">Recent Contests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="text-left py-4 px-6">Contest Name</th>
                                <th className="text-left py-4 px-6">Creator</th>
                                <th className="text-left py-4 px-6">Participants</th>
                                <th className="text-left py-4 px-6">Status</th>
                                <th className="text-left py-4 px-6">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentContests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-500">
                                        No recent contests.
                                    </td>
                                </tr>
                            ) : (
                                recentContests.map((contest) => (
                                    <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-4 px-6 font-medium">{contest.name}</td>
                                        <td className="py-4 px-6">{contest.creatorName || "Unknown"}</td>
                                        <td className="py-4 px-6">{contest.participantsCount || 0}</td>
                                        <td className="py-4 px-6">
                                            <span className={`badge ${
                                                contest.status === "confirmed" ? "badge-success" :
                                                contest.status === "completed" ? "badge-info" :
                                                "badge-warning"
                                            }`}>
                                                {contest.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {new Date(contest.createdAt).toLocaleDateString()}
                                        </td>
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