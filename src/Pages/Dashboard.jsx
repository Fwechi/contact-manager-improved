import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/dashboard.css";

const Dashboard = () => {
  const location = useLocation();

  // ✅ FIX: remove any stuck SweetAlert overlay (DIM SCREEN BUG)
  useEffect(() => {
    Swal.close();
    document.body.classList.remove("swal2-shown");
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Contact Manager</h2>

        <nav>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            📋 Contacts
          </Link>

          <Link
            to="/dashboard/add-contact"
            className={
              location.pathname === "/dashboard/add-contact" ? "active" : ""
            }
          >
            ➕ Add Contact
          </Link>

          <Link to="/logout">🚪 Logout</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="header">
          <h2>Dashboard</h2>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;