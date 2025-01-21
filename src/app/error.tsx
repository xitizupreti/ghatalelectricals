"use client";

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    console.error(error);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Internal Server Error
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {isOnline
            ? "Oops! Something went wrong on our end. Please try again or return to the home page."
            : "It seems like you're offline. Please check your network connection and try again."}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
