const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[0-9\s\-]{7,15}$/, "Invalid phone number format"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Invalid email format"]
  },
  password: { type: String, required: [true, "Password is required"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);