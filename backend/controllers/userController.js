import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from "../models/user.model.js";
import axios from 'axios';

export const userRegister = async (req, res) => {
    try {
        const { name, email, password, picture, captchaToken } = req.body;
        if (!captchaToken) return res.status(400).json({ message: "Captcha is required" });
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required.",
            });
        }
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            {},
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken,
                },
            }
        );
        if (!response.data.success) {
            return res.status(400).json({ message: "Captcha verification failed" });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword || "",
            picture: picture || "",
        });
        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
            },
        });
    } catch (error) {
        console.error("User Registration Failed:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration.",
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(406).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error("User authentication failed!", error);
        return res.status(500).json({
            success: false,
            message: "User authentication API crashed - backend",
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

export const googleRegister = async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required.",
            });
        }
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                status: 409,
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new userModel({
            name,
            email,
            picture: picture || '',
            password: hashedPassword,
        });
        await user.save();
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
            },
        });
    } catch (error) {
        console.error("Google registration failed:", error);
        res.status(500).json({
            success: false,
            message: "Server error during Google registration.",
        });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error("User authentication failed!", error);
        return res.status(400).json({
            success: false,
            message: "User authentication API crashed - backend",
        });
    }
};