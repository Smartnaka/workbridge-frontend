import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;