import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: participantsData = [] } = useQuery({
        queryKey: ["participants", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participants/${user.email}`);
            return res.data?.data || [];
        },
        enabled: !!user?.email,
    });

    const { data: contestsData = [] } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contest");
            return res.data;
        },
    });

    console.log("participantsData", participantsData);
    console.log("contestsData", contestsData);
    const participatedId = participantsData.map((item) => item.contestId);
    console.log(participatedId);
    const contestArr = contestsData.contest || [];
    const x = contestArr.map((d) => d._id);
    console.log(x);

    const myContest = participantsData.map((p) => {
        const contest = contestArr.find((c) => c._id === p.contestId);
        return { participant: p, contest };
    });
    console.log(myContest);

    return (
        <div>
            <h2>My Participated Contests</h2>
            {/* You can now merge participantsData and contestsData safely */}
        </div>
    );
};

export default MyParticipated;
