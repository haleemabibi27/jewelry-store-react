const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
  .connect(
    "mongodb+srv://lesamona852_db_user:mynameis1234@cluster0.0roi0e9.mongodb.net/jewelleryDB",
    {
      serverSelectionTimeoutMS: 5000,
    }
  )
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

    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
