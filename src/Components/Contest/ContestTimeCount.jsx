import React, { useEffect, useState } from "react";
import { GiTargetPrize } from "react-icons/gi";
import { FaMoneyBills } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Modal from "../Modal/Modal";

const ContestTimeCount = ({ prize, deadline, createdAt, entryFee, contestId, participantsCount }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
    });

    //time countdown
    const calculationTimeRemaining = () => {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end - now;
        if (diff <= 0) {
            return {
                days: 0,
                hours: 0,
                mins: 0,
                secs: 0,
                expired: true,
            };
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
        if (!deadline) return;
        const updateTime = () => {
            setTimeRemaining(calculationTimeRemaining(deadline));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, [deadline]);

    //format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col gap-2 ">
                <span className="text-2xl font-semibold text-blue-500 px-12 py-6">Contest Ends In</span>
                <div className="w-[80%] mx-auto flex items-center gap-3 bg-blue-100 rounded-2xl p-4">
                    {[
                        { value: timeRemaining.days, label: "Days" },
                        { value: timeRemaining.hours, label: "Hours" },
                        { value: timeRemaining.mins, label: "Mins" },
                        { value: timeRemaining.secs, label: "Secs" },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">
                                {String(item.value).padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="text-gray-300" />
            <div className="w-[80%] mx-auto flex items-center gap-3 bg-blue-100 rounded-2xl p-4">
                <FaMoneyBills className="text-blue-500" size={30} />
                <div className="flex flex-col ">
                    <span className="text-slate-700">Prize money</span>
                    <strong>${prize}</strong>
                </div>
            </div>
            <div className="w-[80%] mx-auto flex items-center gap-3 bg-blue-100 rounded-2xl p-4">
                <MdPeople className="text-blue-500" size={30} />
                <div className="flex flex-col ">
                    <span className="text-slate-700">Participants</span>
                    <strong>{participantsCount}</strong>
                </div>
            </div>
            <div className="w-[80%] mx-auto flex items-center gap-3 bg-blue-100 rounded-2xl p-4">
                <RiMoneyDollarCircleLine className="text-blue-500" size={30} />
                <div className="flex flex-col ">
                    <span className="text-slate-700">Entry Fee</span>
                    <strong>${entryFee}</strong>
                </div>
            </div>
            <hr className="text-gray-300" />
            <div className="w-[80%] mx-auto">
                <button onClick={()=>setIsOpenModal(true)} className="btn btn-active btn-primary w-full">Payment</button>
            </div>

            <div className="w-[80%] mx-auto flex flex-col gap-2 bg-blue-100 rounded-2xl p-4">
                <strong>Ends Date</strong>
                <span>{formatDate(deadline)}</span>
            </div>
            <div className="w-[80%] mx-auto flex flex-col gap-2 bg-blue-100 rounded-2xl p-4">
                <strong>Start Date</strong>
                <span>{formatDate(createdAt)}</span>
            </div>
            {isOpenModal && <Modal contestId={contestId} entryFee={entryFee} onClose={()=>setIsOpenModal(false)}/>}
        </div>
    );
};
export default ContestTimeCount;
