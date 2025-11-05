import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "seeker" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      setMessage("Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="seeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
