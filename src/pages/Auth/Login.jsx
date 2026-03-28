import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Please enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label>Email</label>
            <div className="input-field">
              <FiMail className="icon" />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <FiLock className="icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <span>Sign up</span></p>
        </div>
      </div>
    </div>
  );
}