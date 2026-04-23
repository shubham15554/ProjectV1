import User from "../models/user.js";

export const isMentor = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== "mentor") { 
            return res.status(403).json({ message: "Access denied. You are not a Mentor" });
        }
        next();
    }
    catch (err) {
        console.error("isMentor Middleware Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};