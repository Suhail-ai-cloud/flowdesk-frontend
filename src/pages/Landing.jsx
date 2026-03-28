import React from "react";
import { Link } from "react-router-dom";
import { FiLayers, FiUsers, FiActivity } from "react-icons/fi";
import Footer from "../components/Footer";
import "./styles/Landing.css";

export default function Landing() {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-nav">

        <div className="brand">
          <div className="brand-logo">FD</div>
          <span>FlowDesk</span>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/register" className="btn-primary">Create Workspace</Link>
        </div>

      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            The modern workspace
            <br />
            for high-performance teams
          </h1>

          <p>
            Plan projects, manage tasks, and collaborate with your team using a
            powerful Kanban workflow designed for modern organizations.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-primary big">
              Start Your Workspace
            </Link>

            <Link to="/login" className="btn-outline big">
              Login
            </Link>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2 className="section-title">
          Everything your team needs
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <FiLayers className="feature-icon"/>
            <h3>Kanban Boards</h3>
            <p>
              Drag, drop, and organize tasks visually across stages.
            </p>
          </div>

          <div className="feature-card">
            <FiUsers className="feature-icon"/>
            <h3>Team Collaboration</h3>
            <p>
              Assign tasks, discuss work, and collaborate in real time.
            </p>
          </div>

          <div className="feature-card">
            <FiActivity className="feature-icon"/>
            <h3>Activity Tracking</h3>
            <p>
              Monitor updates and stay informed with real-time activity logs.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2>Start building better workflows today</h2>

        <Link to="/register" className="btn-primary big">
          Create Your Workspace
        </Link>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}