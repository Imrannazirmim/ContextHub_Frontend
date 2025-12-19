import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import { RiTeamFill } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TrendingContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trending = [], isLoading } = useQuery({
    queryKey: ["trending-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/popular");
      return res.data.contests || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading trending contests...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Contests
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join the most popular creative challenges happening right now
          </p>
        </div>

        {/* Contests Grid */}
        {trending.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trending.map((contest) => (
                <div
                  key={contest._id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={contest.image || "https://via.placeholder.com/600x400?text=No+Image"}
                      alt={contest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
                      {contest.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-5">
                      {contest.description || contest.taskInstruction || "No description available"}
                    </p>

                    {/* Participants */}
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-6">
                      <RiTeamFill className="text-xl text-primary" />
                      <span className="font-semibold">
                        {contest.participantsCount?.toLocaleString() || 0} Participants
                      </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/contest/${contest._id}`}
                      className="block w-full text-center btn btn-primary rounded-xl hover:btn-secondary transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Show All Button */}
            <div className="text-center mt-12">
              <Link
                to="/contest"
                className="btn btn-outline btn-primary btn-lg rounded-full px-10 py-3 hover:btn-primary transition"
              >
                Explore All Contests
              </Link>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6 text-gray-300 dark:text-gray-700">🏆</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              No trending contests yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Be the first to create an exciting contest and watch it trend!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingContests;