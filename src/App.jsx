import React, { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";

// Components
import Contacts from "./Components/Contacts";
import AddContact from "./Components/AddContact";
import EditContact from "./Components/EditContact";
import Logout from "./Components/Logout";
import ProtectedRoutes from "./Components/ProtectedRoutes";

export const UserContext = createContext(null);

// ROUTER
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  { path: "/about", element: <About /> },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Contacts /> },
      { path: "add-contact", element: <AddContact /> },
      { path: "edit-contact/:id", element: <EditContact /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ PERSIST USER AFTER REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ SAVE USER TO LOCAL STORAGE
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      {/* ✅ TOAST CONFIG (IMPROVED UX) */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;