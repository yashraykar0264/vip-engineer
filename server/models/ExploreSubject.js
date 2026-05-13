const mongoose = require("mongoose");

const exploreSubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  emoji: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ExploreSubject", exploreSubjectSchema);
