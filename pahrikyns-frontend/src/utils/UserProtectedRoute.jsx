import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UserProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While loading user token → avoid blank flash
  if (loading) return null;

  // If not logged in → redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render dashboard layout + pages
  return children;
}
