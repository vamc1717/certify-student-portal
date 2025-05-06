
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role doesn't match
    switch (user.role) {
      case 'state':
        return <Navigate to="/state-dashboard" replace />;
      case 'dist':
        return <Navigate to="/district-dashboard" replace />;
      case 'college':
        return <Navigate to="/college-dashboard" replace />;
      case 'student':
        return <Navigate to="/student-dashboard" replace />;
      case 'verification':
        return <Navigate to="/verification-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
