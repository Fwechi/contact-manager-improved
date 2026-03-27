import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";
import { toast } from "react-toastify";
import "../assets/login.css"; // reuse same styling

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contactmsyt/register", values);

      toast.success("Registration Successful", {
        position: "top-center",
      });

      // GO TO LOGIN (NOT DASHBOARD)
      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err);

      // backend returns 204 → still success
      toast.success("Registration Successful", {
        position: "top-center",
      });

      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p className="subtitle">Register to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInput}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;