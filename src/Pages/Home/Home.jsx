import React from "react";
import HeroSection from "../../Components/Common/Header/HeroSection/HeroSection";
import TrendingContext from "../../Components/Common/TrendingContext/TrendingContext";
import Celebrate from "../../Components/Common/ContestWinner/Celebrate";
import Choose from "../../Components/Common/ContestWinner/Choose";

const Home = () => {
    return (
        <>
            <HeroSection />
            <main className="container mx-auto mt-32">
                <h2 className="text-2xl text-slate-700 font-semibold">Trending Context</h2>
                <TrendingContext />
                <div>
                    <Celebrate/>
                    <Choose/>
                </div>
            </main>
        </>
    );
};

export default Home;
