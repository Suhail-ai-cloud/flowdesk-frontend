import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  FiBriefcase,
  FiUser,
  FiMail,
  FiLock
} from "react-icons/fi";

import "./styles/Register.css";

export default function Register() {

  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await register(form);

      await login(form.email, form.password);

      navigate("/dashboard");

    } catch {
      alert("Registration failed");
    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <h1>Create your workspace</h1>

          <p>
            Start organizing your team and projects in minutes.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="register-form">

          <div className="input-group">

            <FiBriefcase className="input-icon"/>

            <input
              type="text"
              placeholder="Company Name"
              required
              onChange={(e) =>
                setForm({ ...form, company_name: e.target.value })
              }
            />

          </div>

          <div className="input-group">

            <FiUser className="input-icon"/>

            <input
              type="text"
              placeholder="Owner Name"
              required
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

          </div>

          <div className="input-group">

            <FiMail className="input-icon"/>

            <input
              type="email"
              placeholder="Email address"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

          </div>

          <div className="input-group">

            <FiLock className="input-icon"/>

            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

          </div>

          <button className="btn-primary big">
            Create Workspace
          </button>

        </form>

        <p className="login-link">

          Already have a workspace?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}