import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchCurrentUser(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, [token]);

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="text-gray-700">Role: {user.role}</p>
    </div>
  );
}
