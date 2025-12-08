import { useState } from "react";
import HeroBackground from "./HeroBackground";
import SearchBar from "./SearchBar";

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            // Add your search logic here
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="container mx-auto rounded-2xl hero min-h-[500px] relative overflow-hidden" aria-label="Hero section">
            {/* Background */}
            <HeroBackground />

            {/* Content */}
            <div className="hero-content text-center relative z-10 px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="max-w-5xl w-full">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Find Your Next Creative Challenge
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                        Compete, Create, Conquer. Discover thousands of contests and showcase your talent to the world.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleSearch}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}
