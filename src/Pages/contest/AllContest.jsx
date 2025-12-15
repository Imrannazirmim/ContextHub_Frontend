import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiCalendar, FiDollarSign, FiUsers } from "react-icons/fi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AllContest = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contests", activeTab, currentPage],
    queryFn: async () => {
      const typeParam = activeTab === "All" ? "all" : activeTab;
      const res = await axiosSecure.get(
        `/contest?type=${typeParam}&page=${currentPage}&limit=${itemsPerPage}`,
      );
      console.log(res.data);
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = data?.contest ?? [];
  const totalPages = data?.totalPages ?? 1;
  const categories = [
    "All",
    "Art",
    "Writing",
    "Games",
    "Photography",
    "Development",
    "Video",
  ];


  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>Failed to load contests. Try again later!</span>
        </div>
      </div>
    );


    console.log(contests)
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Explore All Contests</h1>

      {/* Category Tabs */}
      <div className="tabs tabs-boxed gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveTab(category);
              setCurrentPage(1);
            }}
            className={`tab font-medium ${
              activeTab === category
                ? "bg-white shadow-md text-primary"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Contest Grid */}
      {contests.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No contests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </figure>

              <div className="card-body p-5">
                {/* Title */}
                <h3 className="card-title text-lg font-bold line-clamp-1">
                  {contest.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {contest.description}
                </p>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiUsers className="text-primary" />
                    <span>{contest.participantsCount || 0} Participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiDollarSign className="text-primary" />
                    <span>Prize: ${contest.prize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCalendar className="text-primary" />
                    <span>{formatDate(contest.deadline)}</span>
                  </div>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className="btn btn-primary btn-sm btn-block"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="btn btn-circle btn-sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(currentPage - page) <= 1
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-circle btn-sm ${
                    currentPage === page ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}

          <button
            className="btn btn-circle btn-sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default AllContest;
