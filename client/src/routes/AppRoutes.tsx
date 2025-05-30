import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import { ProtectedRoute } from "./controllers/ProtectedRoute";
import { PublicRoute } from "./controllers/PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas auth */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
