import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../services/api";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import "../assets/login.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ CLEANUP ANY STUCK OVERLAY (VERY IMPORTANT)
  useEffect(() => {
    Swal.close();
    document.body.classList.remove("swal2-shown");
    document.body.style.overflow = "auto";
  }, []);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/contactmsyt/login", values);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ SET USER
      setUser(res.data.user);

      // ✅ SUCCESS TOAST
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 2000,
      });

      // ✅ NAVIGATE AFTER SMALL DELAY (PREVENT UI GLITCH)
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500);

    } catch (err) {
      toast.error("Invalid credentials", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;