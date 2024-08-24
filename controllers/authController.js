const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const createdUser = new userModel({ name, email, password });
    createdUser.password = await bcrypt.hash(password, 10);
    await createdUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "email or password is invalid", success: false });
  }
  const jwtToken = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  res.json({
    message: "Logged in successfully",
    success: true,
    jwtToken,
    email,
    name: user.name,
  });
};

module.exports = { signup, login };
