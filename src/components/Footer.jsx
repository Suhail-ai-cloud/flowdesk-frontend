import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>FlowDesk</h2>
          <p>
            Modern project & task management platform built for productivity and clarity.
          </p>

          <div className="footer-socials">
            <a href="#"><FiGithub /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiLinkedin /></a>
          </div>
        </div>

        {/* LINKS */}
        <div className="footer-grid">

          <div className="footer-links">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
          </div>

          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Workspace</Link>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <a href="#">Docs</a>
            <a href="#">Support</a>
            <a href="#">Privacy</a>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 FlowDesk. All rights reserved.</p>
      </div>
    </footer>
  );
}