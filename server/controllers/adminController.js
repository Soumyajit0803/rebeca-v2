const bcrypt = require('bcrypt')
const catchAsync = require('../utils/catchAsync')
require('dotenv').config()

const adminCheck = require("../middlewares/adminMiddleware")

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const SECRET_KEY = process.env.JWT_SECRET

const cookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
};

exports.adminLogin = catchAsync((req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username === ADMIN_USERNAME && password == ADMIN_PASSWORD) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });

            res.cookie("adminJWT", token, cookieOptions);
            return res.json({ message:"success", token });
        }
        else return res.status(401).json({ error: "Invalid credentials" });
    } catch (err) {
        next(err);
    }
});

exports.adminStatus = catchAsync(async (req, res, next) => {
    try {
        if (!req.adminuser) return res.json({ message: "No user to logout" });
        return res.json({ message: "success"});

    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.adminLogout = catchAsync(async (req, res) => {
    try {
        // Clear the JWT cookie by setting it to an expired date

        res.cookie("adminJWT", "", {
            expires: new Date(0), // immediate expiration
            httpOnly: true, // Prevent client-side access to the cookie
            secure: true,
            sameSite: "none", // Ensures the cookie is sent in a same-site context
            path: "/", // Make sure it's cleared for the entire site
        });

        return res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("ERROR IN LOGOUT: " + err.message);
        next(err);
    }
});
