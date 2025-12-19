import React from "react";
import { Link } from "react-router"; // Adjust if you're not using React Router

const Why = () => {
    return (
        <div className="min-h-screen  from-base-200 to-base-100">
            {/* Hero Section */}
            <section className="px-6 py-16 md:py-24 lg:py-32 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 mb-6">
                        Unlock Your
                        <br />
                        Creative Potential
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto mb-12">
                        A thrilling ecosystem where innovation meets opportunity. Join the world of most dynamic contest
                        platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/contest" className="btn btn-primary btn-lg rounded-full px-10 shadow-lg">
                            Start Competing
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">50k+</h3>
                        <p className="text-base-content/70 mt-2">Active Users</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">$2M+</h3>
                        <p className="text-base-content/70 mt-2">Prizes Awarded</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">5k+</h3>
                        <p className="text-base-content/70 mt-2">Contests Hosted</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">120+</h3>
                        <p className="text-base-content/70 mt-2">Countries</p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">Why Choose ContestHub?</h2>
                    <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
                        Everything you need to grow your career, find talent, and showcase your creativity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {/* Card 1 - Win Amazing Prizes */}
                    <div className="card bg-base-100 ">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🏆</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Win Amazing Prizes</h3>
                            <p className="text-base-content/70 mb-6">
                                Compete in exciting contests for cash prizes, software licenses, and recognition.
                            </p>
                            <ul className="text-left space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500">✓</span> Verified organizers
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500">✓</span> Diverse categories
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-green-500">✓</span> Transparent judging
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 2 - Get Discovered */}
                    <div className="card bg-base-100 ">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Get Discovered</h3>
                            <p className="text-base-content/70 mb-6">
                                Showcase your portfolio publicly. See your work in front of industry leaders, brands,
                                and peers worldwide.
                            </p>
                            <ul className="text-left space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-500">●</span> Global exposure
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-500">●</span> Social sharing
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-blue-500">●</span> Peer feedback
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Card 3 - Build Your Portfolio */}
                    <div className="card bg-base-100 ">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🎓</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Build Your Portfolio</h3>
                            <p className="text-base-content/70 mb-6">
                                Every submission becomes a real-world project. Every win is a chance to prove your
                                brilliance and diversify your work.
                            </p>
                            <ul className="text-left space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-500">◉</span> Showcase wins
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-500">◉</span> Shareable links
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-500">◉</span> Community ratings
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">Ready to Start?</h2>
                    <p className="text-xl text-base-content/70 mb-10">
                        Join thousands of creators and brands reshaping the creative landscape.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth/register" className="btn btn-primary btn-lg rounded-full px-10 shadow-lg">
                            Create Free Account
                        </Link>
                        <Link to="/contest" className="btn btn-outline btn-lg rounded-full px-10">
                            Explore Contests
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Why;
