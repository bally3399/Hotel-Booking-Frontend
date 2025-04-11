import React from "react";

const NotFoundPage = ({text,emoji}) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
            {/* Main Content */}
            <div className="text-center">
                {/* Error Code */}
                <h1 className="text-9xl font-bold mb-7">
                    {emoji}
                </h1>

                {/* Message */}
                <p className="text-3xl font-semibold text-gray-800 mb-2">
                    Oops! {text}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                    {text? text : " The page you are looking for doesn't exist or has been moved"}
                </p>

                {/* Action Button */}
                <a
                    href="/"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Go Back to Home
                </a>
            </div>

            {/* Background Decoration (Optional) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
            </div>
        </div>
    );
};

export default NotFoundPage;