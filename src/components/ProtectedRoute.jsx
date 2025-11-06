import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);        // Tracks auth check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
    setLoading(false);  // Done checking
  }, []);

  if (loading) {
    // Show loading spinner while checking
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;