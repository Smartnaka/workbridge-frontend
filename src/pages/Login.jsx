import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "job-seeker",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Prefill remembered email when component mounts
    try {
      const remembered = localStorage.getItem("remember_email");
      if (remembered) {
        setForm((p) => ({ ...p, email: remembered, remember: true }));
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const setRole = (role) => setForm((prev) => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      };
      const data = await loginUser(payload);
      // store token
      localStorage.setItem("token", data.token);
      if (form.remember) localStorage.setItem("remember_email", form.email);
      else localStorage.removeItem("remember_email");
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: branding / illustration */}
        <aside className="hidden md:flex flex-col items-center justify-center bg-indigo-700 text-white p-8 gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl">WB</div>
          <div className="text-center px-6">
            <h2 className="text-2xl font-semibold">Welcome back to WorkBridge</h2>
            <p className="mt-2 text-indigo-200 text-sm">Sign in to find jobs, manage applicants, and grow your career.</p>
          </div>
          <div className="mt-4 text-sm text-indigo-200">
            New here? <a href="/register" className="underline font-medium text-white">Create an account</a>
          </div>
        </aside>

        {/* Right: form */}
        <main className="p-8 md:p-10">
          <div className="max-w-md mx-auto">
            <header className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">WB</div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Sign in</h1>
                <p className="text-sm text-gray-500">Use your account to continue</p>
              </div>
            </header>

            {error && (
              <div role="alert" className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot?</a>
                </div>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
              </div>

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
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-center text-sm text-gray-500">or continue with</div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 border rounded p-2 text-sm hover:bg-gray-50" aria-label="Sign in with Google">
                  {/* Google icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M21 12.3c0-.7-.1-1.3-.2-1.9H12v3.6h5.6c-.2 1.2-.9 2.3-1.8 3.1v2.6h2.9c1.7-1.6 2.7-3.8 2.7-6.4z" fill="#4285F4" />
                    <path d="M12 22c2.4 0 4.4-.8 5.9-2.1l-2.9-2.6c-.8.6-1.8 1-3 1-2.3 0-4.2-1.6-4.9-3.8H4.1v2.4C5.6 19.9 8.6 22 12 22z" fill="#34A853" />
                    <path d="M7.1 13.5A5.4 5.4 0 007 12c0-.5.1-1 .3-1.5V8.1H4.1A9.9 9.9 0 002 12c0 1.6.4 3.2 1.1 4.6l4-3.1z" fill="#FBBC05" />
                    <path d="M12 6.5c1.3 0 2.5.4 3.4 1.2l2.6-2.6C16.3 3.3 14.4 2.5 12 2.5 8.6 2.5 5.6 4.6 4.1 7.4l3 2.4c.7-2.2 2.6-3.3 4.9-3.3z" fill="#EA4335" />
                  </svg>
                  Google
                </button>

                <button type="button" className="flex items-center justify-center gap-2 border rounded p-2 text-sm hover:bg-gray-50" aria-label="Sign in with GitHub">
                  {/* GitHub icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12a10 10 0 0010 10c5.5 0 10-4.5 10-10z" fill="#24292F" />
                    <path d="M12 6.5a5.5 5.5 0 00-1.7 10.7c.3.1.4-.1.4-.3v-1.1c-1 .2-1.2-.4-1.2-.4-.3-.7-.8-.9-.8-.9-.6-.4 0-.4 0-.4.7 0 1.1.7 1.1.7.6 1 1.6.7 2 .6.1-.5.3-.7.5-.9-2.2-.2-4.4-1.1-4.4-4.9 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 3 .9a10.3 10.3 0 015.5 0c2.1-1.2 3-0.9 3-0.9.6 1.5.2 2.5.1 2.8.7.8 1.1 1.8 1.1 2.8 0 3.9-2.2 4.7-4.4 4.9.3.3.6.8.6 1.6v2.3c0 .2.1.4.4.3A5.5 5.5 0 0012 6.5z" fill="#FFF" />
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don't have an account? <a href="/register" className="text-blue-600 font-medium">Register</a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}