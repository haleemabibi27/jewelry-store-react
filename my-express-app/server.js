const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONNECT TO MONGO FIRST
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ ROUTES ONLY AFTER DB CONNECTS
    app.use("/products", productRoutes);
    app.use("/orders", orderRoutes);
    app.use("/contact", contactRoutes);
    app.use("/newsletter", newsletterRoutes);
    app.use("/users", userRoutes);

    app.get("/", (req, res) => {
      res.send("Jewellery API Running");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });