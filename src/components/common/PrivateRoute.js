import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
