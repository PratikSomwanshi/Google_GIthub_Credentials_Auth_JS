"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const errorMessage =
        {
            InvalidEmailDomain:
                "Your email domain is not allowed to access this application.",
            OAuthCallback:
                "There was an issue with the authentication process.",
            OAuthAccountNotLinked: "This account is not found.",
        }[error as string] || "An unknown error occurred.";

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-red-400 mb-4">
                    Authentication Error
                </h1>
                <p className="text-gray-300 text-lg mb-6">{errorMessage}</p>
                <a
                    href="/login"
                    className="inline-block px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-200">
                    Try Again
                </a>
            </div>
        </div>
    );
}
