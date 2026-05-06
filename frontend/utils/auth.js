const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("./db");

const getTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  if (!authorization) return null;
  const parts = authorization.split(" ");
  if (parts[0] !== "Bearer" || !parts[1]) return null;
  return parts[1];
};

const verifyToken = async (req) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    throw new Error("Not authorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded?.id) {
    throw new Error("Not authorized");
  }

  await db.connect();
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new Error("Not authorized");
  }

  return user;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { getTokenFromHeader, verifyToken, generateToken };
