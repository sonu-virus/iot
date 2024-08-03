import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/context";
const PrivateRoutes = () => {
  const { isLogin } = useContext(AuthContext);

  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
