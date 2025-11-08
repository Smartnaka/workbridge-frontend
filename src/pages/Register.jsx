import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job-seeker",
    companyLogo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files?.[0] ?? null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setRole = (role) => setForm((prev) => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // If there's a file (company logo) send as FormData
      let payload = null;
      if (form.companyLogo) {
        payload = new FormData();
        payload.append("name", form.name);
        payload.append("email", form.email.trim());
        payload.append("password", form.password);
        payload.append("role", form.role);
        payload.append("companyLogo", form.companyLogo);
      } else {
        payload = {
          name: form.name,
          email: form.email.trim(),
          password: form.password,
          role: form.role,
        };
      }

      await registerUser(payload);
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left - branding / illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-indigo-700 text-white p-8 gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl">WB</div>
          <div className="text-center px-6">
            <h2 className="text-2xl font-semibold">Join WorkBridge</h2>
            <p className="mt-2 text-indigo-200 text-sm">Create an account to apply for jobs, manage listings, and connect with talent.</p>
          </div>
          <div className="mt-4 text-sm text-indigo-200">
            Already registered? <a href="/login" className="underline font-medium text-white">Sign in</a>
          </div>
        </div>

        {/* Right - form */}
        <div className="p-8 md:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">WB</div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Create an account</h1>
                <p className="text-sm text-gray-500">Register to get started</p>
              </div>
            </div>

            {error && (
              <div role="alert" className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Full name or company</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name or company"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3"
                  required
                  aria-label="Full name or company name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3"
                  required
                  aria-label="Email address"
                />
              </label>

              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Password</span>
                </div>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Choose a strong password"
                    className="block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 pr-12"
                    required
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Confirm password</span>
                <div className="mt-1 relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className="block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 pr-12"
                    required
                    aria-label="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
                    aria-pressed={showConfirm}
                    aria-label={showConfirm ? "Hide confirmation password" : "Show confirmation password"}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div>
                <span className="text-sm font-medium text-gray-700">I am a</span>
                <div className="mt-2 inline-flex rounded-md bg-gray-100 p-1" role="tablist" aria-label="Choose role">
                  <button
                    type="button"
                    onClick={() => setRole("job-seeker")}
                    className={`px-3 py-2 text-sm rounded ${form.role === "job-seeker" ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}
                    role="tab"
                    aria-selected={form.role === "job-seeker"}
                  >
                    Job Seeker
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("employer")}
                    className={`ml-1 px-3 py-2 text-sm rounded ${form.role === "employer" ? "bg-white shadow-sm text-gray-900" : "text-gray-600"}`}
                    role="tab"
                    aria-selected={form.role === "employer"}
                  >
                    Employer
                  </button>
                </div>
              </div>

              {form.role === "employer" && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company logo</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-gray-50 text-sm">
                      <input
                        type="file"
                        name="companyLogo"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        aria-label="Upload company logo"
                      />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gray-500">
                        <path d="M12 3v10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 7l4-4 4 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="3" y="13" width="18" height="8" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                      </svg>
                      <span>{form.companyLogo ? form.companyLogo.name : "Upload logo"}</span>
                    </label>
                    {form.companyLogo && (
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, companyLogo: null }))}
                        className="text-sm text-gray-500 underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : null}
                {loading ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account? <a href="/login" className="text-blue-600 font-medium">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
