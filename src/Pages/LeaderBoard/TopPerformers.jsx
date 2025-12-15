import PodiumCard from "./PodiumCard";

const TopPerformers = ({ leaders }) => {
    if (!leaders || leaders.length < 3) return null;

    return (
        <div className="mb-14">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Top Performers
            </h2>

            <div className="flex flex-col md:flex-row items-end justify-center gap-6">
                {/* 2nd */}
                <PodiumCard
                    user={leaders[1]}
                    place="2nd Place"
                    size="small"
                    medalColor="text-gray-400"
                    borderColor="border-gray-300"
                />

                {/* 1st */}
                <PodiumCard
                    user={leaders[0]}
                    place="1st Place"
                    size="large"
                    medalColor="text-yellow-500"
                    borderColor="border-yellow-400"
                    highlight
                />

                {/* 3rd */}
                <PodiumCard
                    user={leaders[2]}
                    place="3rd Place"
                    size="small"
                    medalColor="text-orange-500"
                    borderColor="border-orange-400"
                />
            </div>
        </div>
    );
};
export default TopPerformers