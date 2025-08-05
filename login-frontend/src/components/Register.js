import React, { useState, useEffect } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate(); // ✅ inside component

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message) {
      setMessage("Registration successful! Please log in.");
      setError(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage(data.error || "Registration failed");
      setError(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          autoComplete="new-username"
          value={form.username}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          autoComplete="new-email"
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="new-password"
          value={form.password}
        />
        <button type="submit">Register</button>
      </form>
      {message && (
        <p className={`auth-message ${error ? "error" : ""}`}>{message}</p>
      )}
    </div>
  );
}
