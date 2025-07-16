// src/routes/privateRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
