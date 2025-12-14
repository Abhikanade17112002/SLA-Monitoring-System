import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../utility/utility";
import { handleLogOut } from "../../store/slices/AuthSlice/AuthSlice";

const ProtectedRoute = ({ children,allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch() ;

  if (!isTokenValid()) {
    dispatch(handleLogOut()) ;
    return <Navigate to="/" />;
  }

  // 2️⃣ ROLE CHECK
  if (allowedRoles && !allowedRoles.includes(   user?.role?.toUpperCase()   )) {
    return <Navigate to="/unauthorized"  />;
  }

  // 3️⃣ AUTHORIZED
  return children;

};

export default ProtectedRoute;
