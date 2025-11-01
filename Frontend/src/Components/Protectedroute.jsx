import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protectedroute = () => {
  const token = localStorage.getItem("token");
  const userrole = localStorage.getItem("role");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If not admin, redirect to unauthorized
  if (userrole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, allow access
  return <Outlet />;
};

export default Protectedroute;
