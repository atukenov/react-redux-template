const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");

const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route 	GET api/auth
// @access	Public
// @desc    Get user if exists, and return it.
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route 	POST api/auth/login
// @access	Public
// @desc    User login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      err = error.array()[0];
      return res.status(400).json({ msg: err.msg });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({ user, token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error...");
    }
  }
);

module.exports = router;
