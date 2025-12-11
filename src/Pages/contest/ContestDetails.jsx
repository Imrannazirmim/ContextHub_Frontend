import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure.jsx";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Utils/Loading.jsx";
import ContestTab from "../../Components/Contest/ContestTab.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import ContestTimeCount from "../../Components/Contest/ContestTimeCount.jsx";
import { FaArrowLeft } from "react-icons/fa";

const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [contestData, setContestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error("Invalid contest ID");
      setIsLoading(false);
      return;
    }
    const fetchContest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axiosSecure.get(`/contest/${id}`);
        setContestData(res.data);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch contest details";
        setError(message);
        toast.error(`Contest fetching failed. ${message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContest();
  }, [axiosSecure, id]);

  if (isLoading) return <Loading />;
  if (error) {
    return <div className="alert-error">Error: ${error}</div>;
  }
  if (!contestData)
    return <span className="alert-warning">Contest not found!</span>;
  console.log(contestData);
  return (
    <>
      <Toaster />
      <div className="container mx-auto pl-4  pt-16">
        <button onClick={() => navigate("/contest")} className="btn btn-accent">
          <FaArrowLeft />
          Go Back
        </button>
      </div>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 sticky container mx-auto pt-16 pb-8">
        {/*left side*/}

        <section className="lg:col-span-8 space-y-12 mx-0 p-4 lg:p-0 lg:mx-4">
          <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={contestData.image}
              alt={contestData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="btn btn-outline btn-primary ">
            {contestData.contestType}
          </span>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-wrap">
              {contestData.name}
            </h2>
            <p className="text-slate-600">{contestData.description}</p>
          </div>
          <div>
            <ContestTab description={contestData.description} />
          </div>
          <div className="flex flex-col gap-2 flex-wrap bg-green-100 py-6 px-8 rounded-2xl">
            <h4 className="text-xl font-semibold text-green-500">
              Winner Announcement
            </h4>
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={contestData.image}
                alt=""
              />
              <div>
                <strong>{user?.displayName}</strong>
                <p className="text-sm text-green-800">
                  Congratulations to the winner!
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*right side*/}
        <section className="lg:col-span-4 shadow rounded-2xl h-screen">
          <ContestTimeCount
            prize={contestData.prize}
            entryFee={contestData.entryFee}
            createdAt={contestData.createdAt}
            deadline={contestData.deadline}
          />
        </section>
      </main>
    </>
  );
};

export default ContestDetails;
