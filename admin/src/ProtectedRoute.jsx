import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { admin } = useAuth();
  console.log(admin);
  return (admin)? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
