import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyWinning = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["my-winnings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/winning/user/me");
            return res.data;
        },
    });

    console.log(data);
    
    const { winningContests = [] } = data;

    if (isLoading) return <p className="text-center py-20 text-2xl">Loading your victories...</p>;

    if (winningContests.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-3xl text-gray-600 dark:text-gray-400 mb-6">No wins yet!</p>
                <p className="text-xl">Keep competing — your moment is coming! 🏆</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-12">My Winning Contests 🏆</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {winningContests.map((contest) => (
                    <div key={contest._id} className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
                        <div className="absolute top-4 right-4 bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow">
                            WINNER
                        </div>
                        <img src={contest.image} alt={contest.name} className="w-full h-64 object-cover" />
                        <div className="p-8 text-white">
                            <h3 className="text-2xl font-bold mb-3">{contest.name}</h3>
                            <p className="text-lg opacity-90 mb-4">{contest.contestType}</p>
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold">${contest.prizeMoney}</p>
                                    <p className="text-xl mt-2">Prize Won</p>
                                </div>
                            </div>
                            <p className="text-center mt-6 text-sm opacity-80">
                                Won on {new Date(contest.winnerDeclaredAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyWinning;