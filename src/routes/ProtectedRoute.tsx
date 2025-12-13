import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
    children:ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <p>Loading...</p>; 
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
