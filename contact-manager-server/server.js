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

// ================= TEMP DATABASE =================

let contacts = [];
let users = [];

// ================= AUTH =================

// REGISTER
app.post("/contactmsyt/register", (req, res) => {
  let { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // ✅ normalize input
  email = email.trim().toLowerCase();
  password = password.trim();

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = { email, password, name };
  users.push(newUser);

  console.log("REGISTERED USER:", newUser);
  console.log("ALL USERS:", users);

  return res.status(200).json({
    message: "Registered successfully",
  });
});

// LOGIN
app.post("/contactmsyt/login", (req, res) => {
  let { email, password } = req.body;

  // ✅ normalize input
  email = email?.trim().toLowerCase();
  password = password?.trim();

  console.log("LOGIN ATTEMPT:", email, password);
  console.log("CURRENT USERS:", users);

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    token: "dummy-token",
    user: { email: user.email, name: user.name },
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

// ✅ REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});