const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const connectDB = require("./config/db");

const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

const User = require("./models/User");
const Note = require("./models/Note");
const Purchase = require("./models/Purchase");

const app = express();

// ================================
// DATABASE
// ================================

connectDB();

// ================================
// MIDDLEWARE
// ================================

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vip-engineer.vercel.app"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// ================================
// STATIC FOLDERS
// ================================

app.use("/uploads", express.static("uploads"));

app.use("/screenshots", express.static("screenshots"));

// ================================
// PDF STORAGE
// ================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ================================
// SCREENSHOT STORAGE
// ================================

// SCREENSHOT STORAGE

const screenshotStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "screenshots/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const screenshotUpload = multer({
  storage: screenshotStorage,
});

// ================================
// FILE FILTER
// ================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF Allowed"), false);
  }
};

// ================================
// MULTER
// ================================

const upload = multer({
  storage,
  fileFilter,
});

const screenshotUpload = multer({
  storage: screenshotStorage,
});

// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {
  res.send("VIP Engineer API Running 🚀");
});

// ================================
// SIGNUP
// ================================

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.json({
      message: "Signup Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

// ================================
// LOGIN
// ================================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d",
      },
    );

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login Failed",
    });
  }
});

// ================================
// ADD NOTE
// ================================

app.post(
  "/add-note",

  authMiddleware,

  adminMiddleware,

  upload.single("pdf"),

  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "PDF Required",
        });
      }

      const newNote = new Note({
        title,
        description,
        price,
        pdf: req.file.filename,
      });

      await newNote.save();

      res.json({
        message: "Note Added Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Add Note",
      });
    }
  },
);

// ================================
// FETCH NOTES
// ================================

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();

    res.json(notes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Fetch Notes",
    });
  }
});

// ================================
// PURCHASE REQUEST
// ================================

app.post(
  "/purchase",

  authMiddleware,

  screenshotUpload.single("screenshot"),

  async (req, res) => {
    try {
      const { noteId, transactionId } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "Screenshot Required",
        });
      }

      const existingPurchase = await Purchase.findOne({
        userId: req.user.id,
        noteId,
      });

      if (existingPurchase) {
        return res.status(400).json({
          message: "Purchase Already Exists",
        });
      }

      const newPurchase = new Purchase({
        userId: req.user.id,

        noteId,

        transactionId,

        screenshot: req.file.filename,

        paymentStatus: "pending",
      });

      await newPurchase.save();

      res.json({
        message: "Payment Submitted Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Payment Failed",
      });
    }
  },
);

// ================================
// PURCHASE REQUESTS
// ================================

app.get(
  "/purchase-requests",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const purchases = await Purchase.find()

        .populate("userId")

        .populate("noteId");

      res.json(purchases);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Fetch Requests",
      });
    }
  },
);

// ================================
// APPROVE PAYMENT
// ================================

app.patch(
  "/purchase/approve/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const purchase = await Purchase.findById(req.params.id);

      if (!purchase) {
        return res.status(404).json({
          message: "Purchase Not Found",
        });
      }

      purchase.paymentStatus = "approved";

      await purchase.save();

      res.json({
        message: "Payment Approved Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Approval Failed",
      });
    }
  },
);

// ================================
// SECURE PDF VIEW
// ================================

app.get(
  "/notes/view/:id",

  authMiddleware,

  async (req, res) => {
    try {
      const noteId = req.params.id;

      const purchase = await Purchase.findOne({
        userId: req.user.id,

        noteId,

        paymentStatus: "approved",
      }).populate("noteId");

      if (!purchase) {
        return res.status(403).json({
          message: "Access Denied",
        });
      }

      const pdfPath = path.join(__dirname, "uploads", purchase.noteId.pdf);

      if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({
          message: "PDF Not Found",
        });
      }

      res.sendFile(pdfPath);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

// ================================
// MY PURCHASES
// ================================

app.get(
  "/my-purchases",

  authMiddleware,

  async (req, res) => {
    try {
      const purchases = await Purchase.find({
        userId: req.user.id,
      }).populate("noteId");

      res.json(purchases);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Fetch Purchases",
      });
    }
  },
);

// ================================
// DELETE NOTE
// ================================

app.delete(
  "/delete-note/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const noteId = req.params.id;

      const note = await Note.findById(noteId);

      if (!note) {
        return res.status(404).json({
          message: "Note Not Found",
        });
      }

      await Purchase.deleteMany({
        noteId,
      });

      // DELETE PDF

      if (note.pdf && typeof note.pdf === "string") {
        const pdfPath = path.join(__dirname, "uploads", note.pdf);

        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }

      await Note.findByIdAndDelete(noteId);

      res.json({
        message: "Note Deleted Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Delete Failed",
      });
    }
  },
);

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
