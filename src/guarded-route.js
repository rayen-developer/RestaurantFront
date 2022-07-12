import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardedRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.isLogged);
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default GuardedRoute;
