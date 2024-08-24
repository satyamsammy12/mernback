const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const router = express.Router();

// Define routes
router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

module.exports = router;
