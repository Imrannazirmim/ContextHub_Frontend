import React from 'react'

const ContestTab = ({description}) => {
    return (

        <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Description"/>
            <div className="tab-content bg-base-100 border-base-300 p-6">{description}</div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Tasks Details" defaultChecked/>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                A contest is a competition or struggle where people or teams vie for victory, a prize, or a position, like a sports match, election, or quiz show, but it also means to challenge or dispute something, such as a legal claim or a will, often involving argument or formal opposition. The term implies a contest of skill, strength, or argument to prove superiority or disprove a claim.
                A contest is a competition or struggle where people or teams vie for victory, a prize, or a position, like a sports match, election, or quiz show, but it also means to challenge or dispute something, such as a legal claim or a will, often involving argument or formal opposition. The term implies a contest of skill, strength, or argument to prove superiority or disprove a claim.
                A contest is a competition or struggle where people or teams vie for victory, a prize, or a position, like a sports match, election, or quiz show, but it also means to challenge or dispute something, such as a legal claim or a will, often involving argument or formal opposition. The term implies a contest of skill, strength, or argument to prove superiority or disprove a claim.
            </div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Rules"/>
            <div className="tab-content bg-base-100 border-base-300 p-6">welcome this feature coming soon</div>
        </div>
    )
}
export default ContestTab
