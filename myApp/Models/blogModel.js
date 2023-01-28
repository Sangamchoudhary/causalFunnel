const mongoose = require("mongoose");

// Schema
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  writerId: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "blog must belong to a user"],
  },
});

module.exports = mongoose.model("blogModel", blogSchema);
