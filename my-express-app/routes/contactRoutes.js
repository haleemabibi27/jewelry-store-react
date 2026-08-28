const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async(req,res)=>{ try{ const contacts = await Contact.find(); res.json(contacts); } catch(err){ res.status(500).json({ error: err.message }); } });
router.post("/", async(req,res)=>{ try{ const contact = new Contact(req.body); await contact.save(); res.json({ message:"Message sent" }); } catch(err){ res.status(400).json({ error: err.message }); } });

module.exports = router;
