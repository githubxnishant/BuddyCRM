import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

const auth = async (req, res, next) => {
    try {
        // get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify token
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        req.user = user; // put user on request
        next(); // pass to next middleware
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

export default auth;