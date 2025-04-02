const jwt = require("jsonwebtoken");

const ensureAuthentication = async (req, res, next) => {
    try {
        const token = req.header("Authorization"); 
        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Invalid token, userId missing" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = ensureAuthentication;
