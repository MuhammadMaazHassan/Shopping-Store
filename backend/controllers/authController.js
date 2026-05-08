const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, areaCode } = req.body;
    if (!name || !email || !password || !phone || !address || !areaCode) {
      return res
        .status(400)
        .json({ message: "All fields are required for registration." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      areaCode,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      areaCode: user.areaCode,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        areaCode: user.areaCode,
        token: generateToken(user._id),
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { registerUser, loginUser };
