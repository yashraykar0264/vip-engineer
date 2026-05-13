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
const Folder = require("./models/Folder");

const HomeFolder = require("./models/HomeFolder");
const HomeNote = require("./models/HomeNote");

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
    credentials: true,
  }),
);

app.use(express.json());

// ================================
// STATIC FOLDERS
// ================================

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

const screenshotStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "screenshots/");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, Date.now() + ext);
  },
});

// ================================
// FILE FILTERS
// ================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF Allowed"), false);
  }
};

const screenshotFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// ================================
// MULTER
// ================================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const screenshotUpload = multer({
  storage: screenshotStorage,
  fileFilter: screenshotFileFilter,
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
        expiresIn: "7d",
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
// DASHBOARD NOTES
// ================================

// ADD NOTE

app.post(
  "/add-note",

  authMiddleware,

  adminMiddleware,

  upload.single("pdf"),

  async (req, res) => {
    try {
      const { title, description, price, folder } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "PDF Required",
        });
      }

      const newNote = new Note({
        title,
        description,
        price,
        folder,
        pdf: `/uploads/${req.file.filename}`,
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

// CREATE FOLDER

app.post(
  "/create-folder",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const { name } = req.body;

      const existingFolder = await Folder.findOne({
        name,
      });

      if (existingFolder) {
        return res.status(400).json({
          message: "Folder Already Exists",
        });
      }

      const newFolder = new Folder({
        name,
      });

      await newFolder.save();

      res.json({
        message: "Folder Created Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Create Folder",
      });
    }
  },
);

// GET FOLDERS

app.get("/folders", async (req, res) => {
  try {
    const folders = await Folder.find();

    res.json(folders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Fetch Folders",
    });
  }
});

// DELETE FOLDER

app.delete(
  "/delete-folder/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const folder = await Folder.findById(req.params.id);

      if (!folder) {
        return res.status(404).json({
          message: "Folder Not Found",
        });
      }

      await Note.deleteMany({
        folder: folder.name,
      });

      await Folder.findByIdAndDelete(req.params.id);

      res.json({
        message: "Folder Deleted Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Delete Folder",
      });
    }
  },
);

// GET NOTES

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

// DELETE NOTE

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

      if (note.pdf) {
        const cleanPdf = note.pdf.replace("/uploads/", "");

        const pdfPath = path.join(__dirname, "uploads", cleanPdf);

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
// PURCHASE SYSTEM
// ================================

// PURCHASE REQUEST

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
        screenshot: `/screenshots/${req.file.filename}`,
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

// PURCHASE REQUESTS

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

// APPROVE PAYMENT

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

// MY PURCHASES

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

// SECURE PDF VIEW

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

      const cleanPdf = purchase.noteId.pdf.replace("/uploads/", "");

      const pdfPath = path.join(__dirname, "uploads", cleanPdf);

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

// FREE PDF VIEW

app.get(
  "/notes/free/:id",

  async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({
          message: "Note Not Found",
        });
      }

      // ONLY FREE NOTES

      if (note.price > 0) {
        return res.status(403).json({
          message: "Premium Note",
        });
      }

      const cleanPdf = note.pdf.replace("/uploads/", "");

      const pdfPath = path.join(__dirname, "uploads", cleanPdf);

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
// HOME MARKETPLACE
// ================================

// CREATE HOME FOLDER

app.post(
  "/create-home-folder",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const { name, emoji, color } = req.body;

      const existingFolder = await HomeFolder.findOne({
        name,
      });

      if (existingFolder) {
        return res.status(400).json({
          message: "Folder Already Exists",
        });
      }

      const folder = new HomeFolder({
        name,
        emoji,
        color,
      });

      await folder.save();

      res.json({
        message: "Home Folder Created 🚀",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Create Folder",
      });
    }
  },
);

// GET HOME FOLDERS

app.get(
  "/home-folders",

  async (req, res) => {
    try {
      const folders = await HomeFolder.find();

      res.json(folders);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Fetch Folders",
      });
    }
  },
);

// DELETE HOME FOLDER

app.delete(
  "/delete-home-folder/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const folder = await HomeFolder.findById(req.params.id);

      if (!folder) {
        return res.status(404).json({
          message: "Folder Not Found",
        });
      }

      const notes = await HomeNote.find({
        folder: folder.name,
      });

      for (const note of notes) {
        if (note.pdf) {
          const cleanPdf = note.pdf.replace("/uploads/", "");

          const pdfPath = path.join(__dirname, "uploads", cleanPdf);

          if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
          }
        }
      }

      await HomeNote.deleteMany({
        folder: folder.name,
      });

      await HomeFolder.findByIdAndDelete(req.params.id);

      res.json({
        message: "Folder & Files Deleted Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Delete Failed",
      });
    }
  },
);

// ADD HOME NOTE

app.post(
  "/add-home-note",

  authMiddleware,

  adminMiddleware,

  upload.single("pdf"),

  async (req, res) => {
    try {
      const { title, description, folder, type } = req.body;

      if (type === "free" && !req.file) {
        return res.status(400).json({
          message: "PDF Required For Free Notes",
        });
      }

      const note = new HomeNote({
        title,
        description,
        folder,
        type,
        pdf: req.file ? `/uploads/${req.file.filename}` : "",
      });

      await note.save();

      res.json({
        message: "Home Note Added 🚀",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Add Home Note",
      });
    }
  },
);

// GET HOME NOTES

app.get(
  "/home-notes",

  async (req, res) => {
    try {
      const notes = await HomeNote.find();

      res.json(notes);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed To Fetch Home Notes",
      });
    }
  },
);

// DELETE HOME NOTE

app.delete(
  "/delete-home-note/:id",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {
      const note = await HomeNote.findById(req.params.id);

      if (!note) {
        return res.status(404).json({
          message: "Home Note Not Found",
        });
      }

      if (note.pdf) {
        const cleanPdf = note.pdf.replace("/uploads/", "");

        const pdfPath = path.join(__dirname, "uploads", cleanPdf);

        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }

      await HomeNote.findByIdAndDelete(req.params.id);

      res.json({
        message: "Home Note Deleted Successfully",
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
