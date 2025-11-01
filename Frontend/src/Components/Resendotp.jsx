import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Resendotp = () => {
  const [code, setcode] = useState("");
  const [password, setpassowrd] = useState("");
  const [email, setemail] = useState("");

  const navigate = useNavigate();
  const submitform = async (e) => {
    e.preventDefault();
    try {
      console.log("before the fetch time");

      const data = await fetch("http://localhost:6009/api/v1/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code , email , password }),
      });

      const res = await data.json();
      console.log("Server Response:", res);
    //   alert("OTP submitted successfully 🚀");
      navigate("/resendotp")
    } catch (error) {
      console.log("Error while submitting OTP:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Side (Form) */}
      <div className="flex items-center justify-center px-4 ">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Enter OTP
          </h1>

          <form className="space-y-5" onSubmit={submitform}>
            {/* OTP Input */}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => setcode(e.target.value)}
              />
            </div>
              <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="otp"
                name="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
              <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Password
              </label>
              <input
                type="password"
                id="otp"
                name="passowrd"
                placeholder="......."
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => setpassowrd(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"

            >
              Submit OTP
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (Image or Content) */}
      <div className="hidden lg:flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to Our Platform 🚀</h2>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjt6kYNwFy4_gStca5N_ZMrGu0SjfwN9IvGQ&s"
          width={390}
          height={190}
          alt="Welcome"
        />
      </div>
    </div>
  );
};

export default Resendotp;
