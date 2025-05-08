import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from "../models/user.model.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.error("User Registration Failed!", error);
        res.status(500).json({
            success: false,
            message: "User registration API crashed!",
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in DB
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Compare passwords using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT Token with 7 days expiration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Send the response with token (no cookies involved)
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });

    } catch (error) {
        console.error("User authentication failed!", error);
        return res.status(500).json({
            success: false,
            message: "User authentication API crashed!",
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token missing from request" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error("Server error in getUser:", error);
        res.status(500).json({ error: "Server error" });
    }
};
