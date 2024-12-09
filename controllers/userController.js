const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.schema.js");
const dotenv = require("dotenv");

dotenv.config();

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const ifUserExists = await User.findOne({ email });
        if (ifUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Wrong email or password" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong email or password" });
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
