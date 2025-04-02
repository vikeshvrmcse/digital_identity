// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Reference to User Model
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    image: { type: String, required: true }, // Image file URL
    imagePreview: { type: String, required: true }, // Image preview URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
