const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    gender: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
