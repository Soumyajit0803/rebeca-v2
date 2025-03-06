import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { admin } = useAuth();
  return (admin && admin.role)? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
