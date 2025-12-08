import React from "react";

// Celebrate Winners Section
const Celebrate = () => {
    const stats = [
        { value: "$50,000+", label: "In Prizes Awarded" },
        { value: "1,000+", label: "Winners & Counting" },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
                                Celebrating Our Winners
                            </h2>
                            <p className="text-base-content/70 text-lg">
                                Join a community of creators who have turned their passion into prizes. Your next
                                masterpiece could be the one we celebrate here.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="card bg-base-100 ">
                                    <div className="card-body p-6">
                                        <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                                        <p className="text-base-content/70 text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80"
                                alt="Winner celebrating"
                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div className="space-y-4 pt-8">
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80"
                                alt="Abstract design"
                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Celebrate;
