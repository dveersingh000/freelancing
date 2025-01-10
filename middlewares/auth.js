const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Fetch user details without password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user details to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;