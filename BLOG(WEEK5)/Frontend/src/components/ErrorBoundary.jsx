import React from "react";
import { useRouteError, Link } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();

  const data = error?.data || "Something went wrong.";
  const status = error?.status || 500;
  const statusText = error?.statusText || "Unexpected Error";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-red-100 text-center">
        <div className="text-6xl mb-4">⚠️</div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Oops! Something went wrong
        </h1>

        <p className="text-lg font-semibold text-gray-800 mb-2">
          {status} - {statusText}
        </p>

        <p className="text-gray-600 mb-6">
          {typeof data === "string" ? data : "An unexpected error occurred."}
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;