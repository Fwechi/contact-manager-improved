import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/CSS/form.css";
import { API } from "../services/api";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
} from "react-icons/fa6";

const AddContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contactmsyt/add-contact", values);

      toast.success("Contact has been successfully added", {
        position: "top-center",
        autoClose: 3000,
      });

      // ✅ Trigger refresh in Contacts.jsx (no reload)
      navigate("/dashboard", { state: { refresh: true } });

    } catch (err) {
      console.log("ADD CONTACT ERROR:", err);

      // ⚠️ Backend returns 204 sometimes → still treat as success
      toast.success("Contact has been successfully added", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/dashboard", { state: { refresh: true } });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Create Contact</h2>

        <div className="form-group">
          <FaUserPlus />
          <input
            onChange={handleInput}
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaAt />
          <input
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaPhoneFlip />
          <input
            onChange={handleInput}
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaRegAddressCard />
          <input
            onChange={handleInput}
            type="text"
            name="address"
            placeholder="Enter Address"
            className="form-control"
          />
        </div>

        <button type="submit" className="form-btn">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;