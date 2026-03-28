import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

import { FiHome, FiFolder, FiLogOut } from "react-icons/fi";

import logo from "../assets/logo.png";   // <-- place your logo here

import "./styles/Navbar.css";

export default function Navbar() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <header className="navbar">

      <div className="nav-left">

        <Link to="/dashboard" className="brand">

          <img
            src={logo}
            alt="logo"
            className="brand-logo"
          />

          <span className="brand-name">
            ProjectMaster
          </span>

        </Link>

        <nav className="nav-links">

          <Link to="/dashboard" className="nav-item">
            <FiHome />
            Home
          </Link>

          <Link to="/projects" className="nav-item">
            <FiFolder />
            Projects
          </Link>
          <Link to="/users">Users</Link>

        </nav>

      </div>

      <div className="nav-right">

        <NotificationBell />

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </header>
  );
}