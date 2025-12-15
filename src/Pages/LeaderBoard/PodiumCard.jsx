const PodiumCard = ({ user, place, size, medalColor, borderColor, highlight }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md text-center px-6 py-8 ${
                size === "large" ? "w-72" : "w-64"
            } ${highlight ? "border-2 border-yellow-400" : ""}`}
        >
            {highlight ? (
                <FiAward className="text-4xl text-yellow-500 mx-auto mb-3" />
            ) : (
                <AiFillTrophy className={`text-3xl mx-auto mb-3 ${medalColor}`} />
            )}

            <img
                src={user?.photoURL || "https://via.placeholder.com/120"}
                alt={user?.name}
                className={`mx-auto rounded-full border-4 ${borderColor} ${
                    size === "large" ? "w-28 h-28" : "w-24 h-24"
                }`}
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {user?.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.wins} Wins
            </p>

            <span
                className={`inline-block mt-2 text-sm font-semibold ${
                    highlight ? "text-yellow-500" : "text-gray-400"
                }`}
            >
                {place}
            </span>
        </div>
    );
};
export default PodiumCard