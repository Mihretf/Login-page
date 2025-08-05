import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      {!isLoggedIn && (
        <>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link> | <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
} 