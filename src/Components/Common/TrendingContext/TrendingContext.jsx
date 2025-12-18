import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { RiTeamFill } from "react-icons/ri";
import { motion } from "framer-motion";
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
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Contests
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join the most popular creative challenges right now
          </p>
        </motion.div>

        {/* Contests Grid - Responsive: 1 col mobile → 2 → 3 → 6 on large */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
          {trending.map((contest, index) => (
            <motion.div
              key={contest._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group"
            >
              <figure className="relative overflow-hidden h-48">
                <img
                  src={contest.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </figure>

              <div className="card-body p-6">
                <h3 className="card-title text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                  {contest.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {contest.description || contest.taskInstruction}
                </p>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <RiTeamFill className="text-lg" />
                  <span className="font-medium">
                    {contest.participantsCount.toLocaleString()} Participants
                  </span>
                </div>

                <Link
                  to={`/contest/${contest._id}`}
                  className="btn btn-primary w-full rounded-xl"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show All Button */}
        {trending.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/contest"
              className="btn btn-outline btn-primary btn-lg rounded-full px-8"
            >
              Show All Contests
            </Link>
          </div>
        )}

        {/* Empty State */}
        {trending.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No trending contests yet. Be the first to create one!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingContests;