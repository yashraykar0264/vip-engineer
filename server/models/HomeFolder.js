const mongoose = require("mongoose");

const homeFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  emoji: {
    type: String,
    default: "📂",
  },

  color: {
    type: String,
    default: "#2563eb",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HomeFolder", homeFolderSchema);
