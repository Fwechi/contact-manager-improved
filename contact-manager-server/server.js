const express = require("express");
const cors = require("cors");

const app = express();

// ✅ ALLOW BOTH LOCAL + DEPLOYED FRONTEND
const allowedOrigins = [
  "http://localhost:5173",
  "https://contact-manager-improved.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ TEMP DATABASE
let contacts = [];

// ================= AUTH =================

// REGISTER
app.post("/contactmsyt/register", (req, res) => {
  return res.status(204).send();
});

// LOGIN
app.post("/contactmsyt/login", (req, res) => {
  return res.status(200).json({
    token: "dummy-token",
    user: { email: req.body.email },
  });
});

// VERIFY
app.get("/contactmsyt/verify", (req, res) => {
  return res.status(200).json({
    user: { name: "Test User" },
  });
});

// ================= CONTACT =================

// ADD CONTACT
app.post("/contactmsyt/add-contact", (req, res) => {
  const newContact = {
    _id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  contacts.push(newContact);

  return res.status(200).json({
    success: true,
    contact: newContact,
  });
});

// GET CONTACTS
app.get("/contactmsyt/contacts", (req, res) => {
  return res.status(200).json({
    success: true,
    contacts,
  });
});

// DELETE CONTACT
app.delete("/contactmsyt/contact/:id", (req, res) => {
  const { id } = req.params;

  contacts = contacts.filter((c) => c._id !== id);

  return res.status(200).json({
    success: true,
    contacts,
  });
});

// UPDATE CONTACT
app.put("/contactmsyt/update-contact/:id", (req, res) => {
  const { id } = req.params;

  let updated = false;

  contacts = contacts.map((c) => {
    if (c._id === id) {
      updated = true;
      return { ...c, ...req.body };
    }
    return c;
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  return res.status(200).json({
    success: true,
    contacts,
  });
});

// ================= SERVER =================

// ✅ FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});