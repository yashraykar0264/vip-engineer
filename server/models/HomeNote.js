const mongoose = require("mongoose");

const homeNoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  folder: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },

  // OPTIONAL PDF

  pdf: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HomeNote", homeNoteSchema);
