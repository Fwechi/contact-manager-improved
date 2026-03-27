import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/CSS/form.css";
import { API } from "../services/api";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
} from "react-icons/fa6";

const EditContact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ HANDLE INPUT
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // ✅ FETCH CONTACT (FIXED)
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get("/contactmsyt/contacts");

        const contact = res?.data?.contacts?.find(
          (c) => c._id === id
        );

        if (contact) {
          setValues({
            name: contact.name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            address: contact.address || "",
          });
        }
      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchContact();
  }, [id]);

  // ✅ UPDATE CONTACT (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(
        `/contactmsyt/update-contact/${id}`,
        values
      );

      if (res?.data?.success) {
        toast.success("Contact updated successfully", {
          position: "top-center",
          autoClose: 3000,
        });

        navigate("/dashboard");
      }
    } catch (err) {
      console.log("UPDATE ERROR:", err);

      toast.error("Failed to update contact", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Edit Contact</h2>

        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInput}
            placeholder="Enter Name"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaAt />
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInput}
            placeholder="Enter Email"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaPhoneFlip />
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleInput}
            placeholder="Enter Phone Number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <FaRegAddressCard />
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleInput}
            placeholder="Enter Address"
            className="form-control"
          />
        </div>

        <button type="submit" className="form-btn">
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;