import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/user/${user.email}`);
            return res.data.participatedContests;
        },
    });

    if (isLoading) {
        return <div className="text-center py-10">Loading payment history...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Billing & Payments</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No payment history found
                                </td>
                            </tr>
                        )}

                        {data.map((item) => (
                            <tr key={item._id} className="hover">
                                <td>{new Date(item.paidAt).toLocaleDateString()}</td>

                                <td>
                                    <p className="font-medium">Entry Fee: {item.contest?.name.slice(0, 25)}...</p>
                                    <p className="text-xs text-gray-500">{item.contest?.contestType} Contest</p>
                                </td>

                                <td className="font-semibold">${item.amount.toFixed(2)}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                          item.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : item.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }
                    `}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="text-xs text-gray-500">{item.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
