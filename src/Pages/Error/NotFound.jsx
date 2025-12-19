import React from "react";
import { Link } from "react-router"; // If using React Router

const NotFound = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center">
                {/* Title */}
                <h1 className="text-4xl text-red-500 md:text-5xl font-bold mb-6">404 - Page Not Found</h1>

                {/* Description */}
                <p className="text-sm text-base-content/70 mb-10 leading-relaxed">
                    You've discovered a blank canvas. The page you are looking for might have been moved, renamed, or
                    perhaps never existed. Don't worry, let's get you back to the main stage.
                </p>

                {/* Button */}
                <Link to="/" className="btn btn-primary btn-lg ">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
