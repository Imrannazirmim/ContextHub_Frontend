import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center">
                <div className="w-64 h-64 mx-auto mb-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-8xl text-red-600 font-bold">!</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-6">Oops! Something Went Wrong</h1>

                <p className="text-lg text-base-content/70 mb-10 leading-relaxed">
                    We're having trouble loading this page right now. It might be a temporary glitch. Please try again
                    in a moment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline btn-lg rounded-full px-8"
                    >
                        Reload Page
                    </button>
                    <Link to="/" className="btn btn-primary btn-lg rounded-full px-10">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
