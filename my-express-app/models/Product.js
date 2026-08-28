const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  numericPrice: { type: Number, required: true } // optional if you want separate numeric price
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
