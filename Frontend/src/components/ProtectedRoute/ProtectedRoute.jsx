import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children,allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // 1️⃣ NOT LOGGED IN
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ ROLE CHECK
  if (allowedRoles && !allowedRoles.includes(   user?.role.toUpperCase()   )) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ AUTHORIZED
  return children;

};

export default ProtectedRoute;
