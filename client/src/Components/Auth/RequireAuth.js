import React from "react";
import { Navigate } from "react-router-dom";
import useToken from "../../Utils/useToken";

const RequireAuth = ({ children }) => {
  const { token, setToken } = useToken();
  return token ? children : <Navigate to="/login" />;
};

export default RequireAuth;
