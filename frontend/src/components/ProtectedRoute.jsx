import { Navigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import Loader from "./Loader";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, authLoading } = useApp();

  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
