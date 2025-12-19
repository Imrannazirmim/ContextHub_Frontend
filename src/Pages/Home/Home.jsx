import React from "react";
import HeroSection from "../../Components/Common/Header/HeroSection/HeroSection";
import TrendingContext from "../../Components/Common/TrendingContext/TrendingContext";
import Celebrate from "../../Components/Common/ContestWinner/Celebrate";
import Choose from "../../Components/Common/ContestWinner/Choose";

const Home = () => {
    return (
        <>
            <section>
                <HeroSection />
            </section>
            <main className="container mx-auto mt-32">
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
