import React from "react";

const ContestTab = ({ contest }) => {
    return (
        <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Description" />
            <div className="tab-content bg-base-100 border-base-300 p-6">{contest.description}</div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Tasks Details" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">{contest.instruction}</div>
        </div>
    );
};
export default ContestTab;
