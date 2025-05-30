import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectIsAuthenticated } from "../../store/reducers/authSlice";

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
