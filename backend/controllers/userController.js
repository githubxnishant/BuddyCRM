import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from "../models/user.model.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        let user = await userModel.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        user = new userModel({
            "name": name,
            "email": email,
            "password": hashedPassword,
        })
        await user.save();

        // jwt credentials
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });

        if (token) {
            res.status(200).json({
                success: true,
                user,
            })
        }

    } catch (error) {
        console.error("User Registration Failed!", error);
        res.status(500).json({
            success: false,
            message: "User registration API crashed!",
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.query;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'User not found in db'
        });

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        console.error("User authentication failed!", error);
        res.status(500).json({
            success: false,
            message: "User authentication API crashed!",
        })
    }
}

// export const getUser = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1]; 
//         if (!token) return res.status(401).json({ error: "Unauthorized" });
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         const user = await userModel.findById(decoded.id).select("-password"); 
//         if (!user) return res.status(404).json({ error: "User not found" });
//         res.json({ user });
//     } catch (error) {
//         res.status(500).json({ error: "Invalid or expired token" });
//     }
// };

// export const getUser = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1]; 
//         if (!token) {
//             return res.status(401).json({ error: "Token missing from request" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         const userId = decoded?.user?.id; // ✅ Properly extract id
//         if (!userId) return res.status(401).json({ error: "Invalid token structure" });

//         const user = await userModel.findById(userId).select("-password");
//         if (!user) return res.status(404).json({ error: "User not found" });

//         res.json({ user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Invalid or expired token" });
//     }
// };

export const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token

        if (!token) {
            return res.status(401).json({ error: "Token missing from request" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id).select("-password");  // Find user by decoded ID
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).json({ error: "Invalid or expired token" });
    }
};
