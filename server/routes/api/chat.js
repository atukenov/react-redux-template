const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");

const auth = require("../../middleware/auth");

const Logo = require("../../models/Logo");
const Chat = require("../../models/Chat");

let messages = [];

// @route 	GET api/chat/receiveAllMessage
// @access	Public
// @desc    Get all messages
router.get("/receiveAllMessage", auth, async (req, res) => {
  const { logo, step } = req.query;
  try {
    // const messages = await Message.find({ projectId });
    const data = await Logo.findById(logo);
    res.status(200).json(data.steps[step].chat);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route 	GET api/chat/sendMessage
// @access	Public
// @desc    Send new message
router.post("/sendMessage", auth, async (req, res) => {
  const { logo, step, message, sender } = req.body;
  try {
    const data = await Logo.findById(logo);
    data.steps[step].chat.push({ message, sender });
    await data.save();
    res.status(200).json({ logo, step, message, sender });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
