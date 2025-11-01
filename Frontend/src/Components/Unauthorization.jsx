import React from "react";
import { Link } from "react-router-dom";

const Unauthorization = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-blue-900">403</h1>
        <div className="h-1 w-16 rounded bg-blue-900 my-5 md:my-7"></div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Unauthorized Access
        </p>
        <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md">
          You don’t have permission to view this page. Please contact the
          administrator or log in with the appropriate credentials.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-blue-900 hover:bg-blue-900 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
          >
            Return Home
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorization;
