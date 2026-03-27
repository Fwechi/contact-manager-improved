import React, { useEffect, useState } from "react";
import { API } from "../services/api";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import Swal from "sweetalert2";
import "./contacts.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ CLEANUP ANY STUCK MODAL (FIX DIM SCREEN)
  useEffect(() => {
    Swal.close();
    document.body.classList.remove("swal2-shown");
    document.body.style.overflow = "auto";
  }, []);

  // ✅ FETCH CONTACTS
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contactmsyt/contacts");

      const data = res?.data?.contacts || [];

      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE CONTACT (STABLE + NO FREEZE)
  const deleteContact = async (id) => {
    const result = await Swal.fire({
      title: "Delete this contact?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      allowOutsideClick: true,
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      await API.delete(`/contactmsyt/contact/${id}`);

      await fetchContacts();

      await Swal.fire({
        title: "Deleted!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      Swal.close(); // ✅ ensure overlay removed
    } catch (err) {
      console.log("DELETE ERROR:", err);

      Swal.fire({
        title: "Error deleting contact",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEARCH FILTER
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredContacts(contacts);
      return;
    }

    const result = contacts.filter((c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || "").toLowerCase().includes(search.toLowerCase())
    );

    setFilteredContacts(result);
  }, [search, contacts]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Address", selector: (row) => row.address },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="icon edit" />
          </Link>

          <FaRegTrashCan
            className="icon delete"
            onClick={() => deleteContact(row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="contacts-container">

      {/* HEADER */}
      <div className="contacts-header">
        <h2>Contacts</h2>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search contacts..."
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link to="/dashboard/add-contact">
            <button className="btn-primary">+ Add</button>
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card">
          <h3>{contacts.length}</h3>
          <p>Total Contacts</p>
        </div>

        <div className="card">
          <h3>{search.trim() === "" ? "-" : filteredContacts.length}</h3>
          <p>Search Results</p>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="loader">
          <CircleLoader size={40} />
        </div>
      ) : filteredContacts.length === 0 ? (
        <p className="empty">No contacts found</p>
      ) : (
        <div className="table-card">
          <DataTable
            columns={columns}
            data={filteredContacts}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
      )}
    </div>
  );
};

export default Contacts;