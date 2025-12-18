import { useEffect, useState, useMemo } from "react";
import { MdPeople } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router";

const ContestTimeCount = ({
    contest,
    isRegistered,
    deadlinePassed,
    contestId,
    onSubmitTask,
    hasSubmitted = false,
}) => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
    });

    const navigate = useNavigate();

    const calculateTimeRemaining = () => {
        const now = new Date();
        const end = new Date(contest.deadline);
        const diff = end - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, mins: 0, secs: 0, expired: true };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            secs: Math.floor((diff % (1000 * 60)) / 1000),
            expired: false,
        };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);

            if (remaining.expired) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [contest.deadline]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const timeItems = useMemo(
        () => [
            { value: timeRemaining.days, label: "Days" },
            { value: timeRemaining.hours, label: "Hours" },
            { value: timeRemaining.mins, label: "Mins" },
            { value: timeRemaining.secs, label: "Secs" },
        ],
        [timeRemaining]
    );

    return (
        <div className="flex flex-col space-y-6">
            {/* Countdown */}
            {!deadlinePassed ? (
                <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold text-blue-600 text-center">Contest Ends In</h3>
                    <div className="grid grid-cols-4 gap-4 bg-blue-50 rounded-2xl p-6">
                        {timeItems.map((item) => (
                            <div key={item.label} className="text-center">
                                <div className="text-3xl font-bold text-blue-700">
                                    {String(item.value).padStart(2, "0")}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <h3 className="text-2xl font-bold text-red-600">Contest Ended</h3>
                </div>
            )}

            <hr className="border-gray-300" />

            {/* Prize, Participants, Entry Fee */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
                    <FaMoneyBills className="text-blue-600" size={28} />
                    <div>
                        <p className="text-gray-600">Prize Money</p>
                        <strong className="text-xl">${contest.prizeMoney || contest.prize}</strong>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
                    <MdPeople className="text-blue-600" size={28} />
                    <div>
                        <p className="text-gray-600">Participants</p>
                        <strong className="text-xl">{contest.participantsCount}</strong>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
                    <RiMoneyDollarCircleLine className="text-blue-600" size={28} />
                    <div>
                        <p className="text-gray-600">Entry Fee</p>
                        <strong className="text-xl">${contest.entryFee || contest.price}</strong>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300" />

            {/* Action Buttons */}
            <div className="space-y-3">
                {!deadlinePassed && !isRegistered && (
                    <button
                        onClick={() => navigate(`/checkout-payment/${contestId}`)}
                        className="w-full btn btn-primary text-lg py-3"
                    >
                        Register & Pay
                    </button>
                )}

                {isRegistered && !deadlinePassed && !hasSubmitted && (
                    <button onClick={onSubmitTask} className="w-full btn btn-success text-lg py-3">
                        Submit Task
                    </button>
                )}

                {isRegistered && !deadlinePassed && hasSubmitted && (
                    <button disabled className="w-full btn btn-success opacity-80 text-lg py-3 cursor-not-allowed">
                        Task Submitted ✓
                    </button>
                )}

                {deadlinePassed && (
                    <button disabled className="w-full btn btn-disabled text-lg py-3">
                        Contest Ended
                    </button>
                )}
            </div>

            {/* Dates */}
            <div className="space-y-3">
                <div className="bg-blue-50 rounded-xl p-4">
                    <strong>Start Date</strong>
                    <p>{formatDate(contest.createdAt)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                    <strong>End Date</strong>
                    <p>{formatDate(contest.deadline)}</p>
                </div>
            </div>
        </div>
    );
};

export default ContestTimeCount;
