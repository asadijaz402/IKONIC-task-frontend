import React from "react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    return;
  }
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Dev Connector
    </footer>
  );
};
