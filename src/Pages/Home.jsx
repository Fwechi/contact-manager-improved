import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import "../assets/home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-left">
            <h1>
              Manage Contacts <span>Smarter</span>
            </h1>
            <p>
              A modern contact management system designed for efficiency,
              scalability, and seamless user experience.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <h3>System Highlights</h3>
              <ul>
                <li>⚡ Fast Performance</li>
                <li>🔐 Secure Authentication</li>
                <li>📊 Clean Dashboard</li>
                <li>📇 Easy Contact Management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container">
          <h2>Core Features</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h4>Contact Organization</h4>
              <p>Store and manage contacts efficiently with structured data.</p>
            </div>

            <div className="feature-card">
              <h4>Real-Time Updates</h4>
              <p>Instant updates for creating, editing, and deleting contacts.</p>
            </div>

            <div className="feature-card">
              <h4>Secure Access</h4>
              <p>Authentication system ensuring data privacy and safety.</p>
            </div>

            <div className="feature-card">
              <h4>Scalable System</h4>
              <p>Designed to scale from small apps to enterprise systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid">
          <div>
            <h3>100%</h3>
            <p>Performance Optimized</p>
          </div>

          <div>
            <h3>Secure</h3>
            <p>Data Protection</p>
          </div>

          <div>
            <h3>24/7</h3>
            <p>Availability</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Start Managing Your Contacts Today</h2>
          <Link to="/register" className="btn-primary">
            Create Account
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;