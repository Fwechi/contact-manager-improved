import React, { useContext } from "react";
import "../assets/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          CMS
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <Link to="/about" className="navbar-link">
          About
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>

            {/* ✅ FIXED: no wrong routing */}
            <span className="navbar-user">
              {user.name || "User"}
            </span>

            <Link to="/logout" className="navbar-link logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>

            <Link to="/register" className="navbar-link register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;