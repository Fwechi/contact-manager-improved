import React from "react";
import { Link } from "react-router-dom";
import "../assets/about.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">

        <h1>About Contact Manager</h1>

        <p>
          This is a modern contact management application built using the
          MERN stack: <b>MongoDB, Express, React, Node.js</b>.
        </p>

        <p>
          It allows users to register, log in, and efficiently manage their
          contacts in a clean and intuitive interface.
        </p>

        <p>
          Key features include adding, editing, deleting contacts, and viewing
          detailed information seamlessly.
        </p>

        <p>
          Designed for simplicity, performance, and scalability helping users
          stay organized and productive.
        </p>

        <p className="credit">
          Built by{" "}
          <Link to="https://github.com/adesikiru" target="_blank">
            ADE SIKIRU
          </Link>
        </p>

        <Link to="/" className="about-btn">
          Back to Home
        </Link>

      </div>
    </section>
  );
};

export default About;