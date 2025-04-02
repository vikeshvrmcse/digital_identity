const bcrypt = require('bcrypt');
const UserModel = require('../Models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(409).json({ message: "User already exists, you can login", success: false });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({ message: "Signup successful", success: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const msg = "Email or password is incorrect";
        
        if (!user) {
            return res.status(403).json({ message: msg, success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: msg, success: false });
        }

        
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            jwtToken,
            email,
            name: user.name,
            success: true
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = { login, signup };
