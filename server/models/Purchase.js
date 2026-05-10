const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },

  // SCREENSHOT

  screenshot: {
    type: String,
    default: "",
  },

  // OPTIONAL TRANSACTION ID

  transactionId: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
