import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job-seeker",
    resume: null, // For Job Seeker
    companyLogo: null, // For Employer
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call backend API to register user
    console.log("Registering:", form);

    // Simulate success
    navigate("/login"); // redirect to login after registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name / Company Name"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="job-seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          {form.role === "job-seeker" && (
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full mb-4"
              required
            />
          )}

          {form.role === "employer" && (
            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-4"
              required
            />
          )}

          <button className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">
            Register
          </button>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}