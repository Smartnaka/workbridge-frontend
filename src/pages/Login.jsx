import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "job-seeker",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call backend API to authenticate user
    console.log("Logging in:", form);

    // Simulate login success
    navigate("/dashboard"); // redirect to dashboard after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Job Portal Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="job-seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
            Login
          </button>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}