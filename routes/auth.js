const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate, authorizeAdmin } = require("../middleware/auth");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// Register
router.post("/register", authenticate, authenticate,  async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password, role: "admin" });
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    res.render("register");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.redirect("/auth/login");
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.redirect("/auth/login");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register",authenticate, authenticate, (req, res) => {
  res.render("register");
});

module.exports = router;
