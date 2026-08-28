const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Invalid email format"]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
 