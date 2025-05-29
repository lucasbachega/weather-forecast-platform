import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};
