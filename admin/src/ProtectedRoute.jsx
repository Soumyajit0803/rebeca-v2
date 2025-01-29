import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log(user);
  
  return user==='rebeca' ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
