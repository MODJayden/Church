import React, { use } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ isAuth, user, isloading, children }) => {
  const location = useLocation();
  const { pathname } = location;


  if (isloading) {
    return <div>Loading authentication...</div>;
  }

  // If trying to access protected routes without auth
  if (!isAuth && (pathname.includes("/admin") || pathname.includes("/member"))) {
    return <Navigate to="/" replace />;
  }

  // If authenticated but trying to access auth routes
  if (isAuth && pathname.includes("/auth")) {
    const redirectTo = user?.role === "admin" 
      ? "/admin/addgate" 
      : "/member/memberHome";
    return <Navigate to={redirectTo} replace />;
  }

  // Role-based route protection
  if (isAuth) {
    if (user?.role === "member" && pathname.includes("/admin")) {
      return <Navigate to="/member/memberHome" replace />;
    }
    if (user?.role === "admin" && pathname.includes("/member")) {
      return <Navigate to="/admin/addgate" replace />;
    }
  }

  return children;
};

export default Auth;