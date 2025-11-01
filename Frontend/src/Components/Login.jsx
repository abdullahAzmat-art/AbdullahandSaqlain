import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6600/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();

      if (!response.ok) {
        // Handle error from backend
        Swal.fire({
          title: "Error!",
          text: res.msg || "Login failed",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      // Success alert
      Swal.fire({
        title: "Success!",
        text: `${res.user.name} is successfully logged in`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Save token & role
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);

        // Redirect to dashboard or homepage
        navigate("/dashboard");
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Side (Form) */}
      <div className="flex items-center justify-center px-2">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h1>

          <form className="space-y-5" onSubmit={submitForm}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@gmail.com"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot password */}
            <div>
              <Link to="/resendemail" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (Image or Content) */}
      <div className="hidden lg:flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to CampusConnect 🚀</h2>
        <img src="/images/20945760.jpg" width={390} height={190} alt="Welcome" />
      </div>
    </div>
  );
};

export default Login;
