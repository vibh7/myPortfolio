import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Still loading auth → don’t render ANYTHING
  if (loading) return null;

  // Not admin → go to login
  if (!user || user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
