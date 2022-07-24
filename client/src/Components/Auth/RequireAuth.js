import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../../features/authSlice";

const RequireAuth = () => {
  const token = localStorage.getItem("loggedIn");
  const location = useLocation();

  console.log(token);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
