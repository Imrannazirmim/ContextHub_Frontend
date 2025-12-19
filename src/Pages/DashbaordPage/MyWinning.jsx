import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyWinning = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["my-winnings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/winning/user/me");
            return res.data;
        },
    });

    
    const { winningContests = [] } = data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl text-gray-600 dark:text-gray-400">Loading your victories...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20">
                <p className="text-3xl text-red-600 mb-4">Error loading wins</p>
                <p className="text-xl text-gray-600">{error?.message || "Please try again later."}</p>
            </div>
        );
    }

    if (winningContests.length === 0) {
        return (
            <div className="text-center py-32 rounded-xl">
                <div className="text-8xl mb-6">🏆</div>
                <p className="text-4xl font-bold mb-4">No wins yet!</p>
                <p className="text-xl  max-w-md mx-auto">
                    You've participated in contests—keep going! Declare winners in admin to see them here.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <h1 className="text-5xl font-bold text-center mb-16">
                My Winning Contests 🏆
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {winningContests.map((contest) => (
                    <div
                        key={contest._id}
                        className="relative bg-linear-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        <div className="absolute top-4 right-4 bg-white text-orange-600 px-5 py-2 rounded-full font-bold shadow-md">
                            WINNER
                        </div>
                        <img 
                            src={contest.image || "https://via.placeholder.com/600x400?text=Contest+Image"} 
                            alt={contest.name} 
                            className="w-full h-64 object-cover" 
                        />
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-3 truncate">{contest.name || "Untitled Contest"}</h3>
                            <p className="text-lg opacity-90 mb-6 capitalize">{contest.contestType || "General"}</p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                    <p className="text-5xl font-extrabold">
                                        ${contest.prizeMoney || contest.prize || contest.entryFee || 0}
                                    </p>
                                    <p className="text-xl mt-2">Prize Won</p>
                                </div>
                            </div>
                            <p className="text-center mt-6 text-sm opacity-80">
                                Won on {contest.winnerDeclaredAt 
                                    ? new Date(contest.winnerDeclaredAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
                                    : new Date(contest.deadline || contest.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyWinning;