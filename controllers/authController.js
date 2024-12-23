const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sendSms = require("../utils/sendSms");

exports.generateOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        let user = await User.findOne({ phoneNumber });
        if (!user) {
            user = new User({ phoneNumber });
        }

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 60 * 1000; 
        await user.save();

        await sendSms(phoneNumber, `Your OTP is ${otp}`);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error generating OTP", error });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    try {
        const user = await User.findOne({ phoneNumber });
        if (!user || !user.otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);
        if (!isOtpValid || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
};

exports.registerUser = async (req, res) => {
    const { fullName, phoneNumber, email, workPassStatus } = req.body;

    try {
        let user = await User.findOne({ phoneNumber });
        if (user) {
            // If the user exists but is unverified, resend OTP
            if (!user.isVerified) {
                const otp = generateOTP(); // Generate a 6-digit OTP
                user.otp = otp;
                user.otpExpiry = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes
                await user.save();
                sendOtp(phoneNumber, otp); // Send OTP (SMS or Email)
                return res.status(200).json({
                    message: "OTP resent successfully. Please verify to continue.",
                });
            }

            // If the user is already verified, return an error
            return res.status(400).json({
                message: "User already exists and verified. Please log in.",
            });
        }

        // If the user does not exist, create a new one
        const otp = generateOTP(); // Generate a 6-digit OTP
        user = new User({
            fullName,
            phoneNumber,
            email,
            workPassStatus,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000, // Expires in 5 minutes
        });

        await user.save();
        sendOtp(phoneNumber, otp); // Send OTP (SMS or Email)

        res.status(201).json({
            message: "OTP sent successfully. Please verify to continue.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.resendOtp = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.otp = hashedOtp;
        user.otpExpiry = Date.now() + 60 * 1000;
        await user.save();

        await sendSms(phoneNumber, `Your OTP is ${otp}`);
        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error resending OTP", error });
    }
};

// exports.login = async (req, res) => { 
//     const { country_code, mobile_number, otp } = req.body; 
//     try { 
//         const isValid = verifyOtp(country_code, mobile_number, otp); 
//         if (isValid) { 
//             const user = await User.findOne({ country_code, mobile_number }); 
//             const token = generateToken(user._id); 
//             res.status(200).json({ message: 'Login successful', token }); 
//         } else { 
//             res.status(401).json({ error: 'Invalid OTP' }); 
//         } 
//     } catch (error) { 
//         res.status(500).json({ error: 'Server Error' }); 
//     } 
// };
