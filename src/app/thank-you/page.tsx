import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We appreciate your order and are processing it now. You’ll receive an
          email confirmation shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
