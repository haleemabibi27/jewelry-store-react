const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");

// GET all subscribers
router.get("/", async (req, res) => {
  try {
    const subs = await Newsletter.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST subscribe
router.post("/", async (req, res) => {
  try {
    const sub = new Newsletter(req.body);
    await sub.save();
    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE subscriber by ID
router.delete("/:id", async (req, res) => {
  try {
    const sub = await Newsletter.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ error: "Subscriber not found" });
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
