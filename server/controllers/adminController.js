const axios = require("axios");
const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit');
// const { promisify } = require('util');
const oauth2Client = require("../utils/oauth2client");
const catchAsync = require("./../utils/catchAsync");
// const User = require("../models/userModel");
const Admin = require("../models/adminModel");
require("dotenv").config();

const signToken = (data) => {
    return jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};
// Create and send Cookie ->
const createSendToken = (admin, statusCode, res) => {
    console.log(admin);
    
    const token = signToken(admin.email);

    console.log(process.env.JWT_COOKIE_EXPIRES_IN);
    const cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
    };
    // if (process.env.NODE_ENV === "production") {
    //     cookieOptions.secure = true;
    //     cookieOptions.sameSite = "none";
    // }

    // admin.password = undefined;

    res.cookie("jwt", token, cookieOptions);

    console.log(admin);
    console.log("Cookie stored");

    res.status(statusCode).json({
        message: "success",
        token,
        data: {
            admin,
        },
    });
};
/* GET Google Authentication API. */
exports.adminGoogleAuth = catchAsync(async (req, res, next) => {
    try {
        const code = req.query.code;
        console.log("ADMIN CREDENTIALS -> ", code);

        const googleRes = await oauth2Client.adminOauth2Client.getToken(code);

        oauth2Client.adminOauth2Client.setCredentials(googleRes.tokens);

        const adminRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        console.log(adminRes);
        

        let admin = await Admin.findOne({ email: adminRes.data.email });
        var isNewAdmin = 0;

        if (!admin) {
            isNewAdmin = 1;
            console.log("New Admin found, ask for a passkey to assign role");
            admin = {
                email: adminRes.data.email,
                name: adminRes.data.name,
                image: adminRes.data.picture
            };
        }

        createSendToken(admin, isNewAdmin ? 201 : 200, res);
    } catch (err) {
        next(err);
    }
});

// Secure passkey stored in .env file
const ORGANISER_PASSKEY = process.env.ORGANISER_PASSKEY || "passkey";
const FACILITATOR_PASSKEY = process.env.FACILITATOR_PASSKEY || "passkey";

// Rate Limiting to prevent brute-force attacks
const passkeyLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // Max 10 attempts per 5 minutes
    message: "Too many attempts. Try again later.",
});

exports.validatePasskey = catchAsync(async (req, res, next) => {
    try {
        // Extract passkey from the Authorization header
        const passkey = req.headers.authorization?.replace("Bearer ", "");
        const newAdmin = req.body

        console.log(req.headers)
        console.log(req);
        

        if (!passkey) {
            return res.status(404).json({ status: "Not Found", message: "Passkey not found" });
        }

        if (passkey === FACILITATOR_PASSKEY) {
            const adminData = await Admin.create({
                name: newAdmin.name,
                email: newAdmin.email,
                image: newAdmin.image,
                role: 'Facilitator'
            });
            return res.status(200).json({
                status: "success",
                role: "Facilitator",
                message: "Facilitator access granted for Rebeca admin.",
                data: adminData
            });
        }

        if (passkey === ORGANISER_PASSKEY) {
            const adminData = await Admin.create({
                name: newAdmin.name,
                email: newAdmin.email,
                image: newAdmin.image,
                role: 'Organiser'
            });
            return res.status(200).json({
                status: "success",
                role: "Organiser",
                message: "Organiser access granted for Rebeca admin.",
                data: adminData
            });
        }

        // If passkey is invalid
        return res.status(401).json({
            status: "error",
            message: "Invalid passkey. Access denied.",
        });
    } catch (err) {
        next(err);
    }
});

exports.adminStatus = catchAsync(async (req, res, next) => {
    try {
        if (!req.admin) return res.status(404).json({ message: "No user to logout" });
        console.log(req.admin);
        
        let admin = await Admin.findOne({ email: req.admin.data });
        if (admin) {
            return res.status(200).json({ message: "User is authenticated", admin: admin });
        }
        return res.status(404).json({ message: "User not found! You have been deleted! Login again" });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.adminLogout = catchAsync(async (req, res) => {
    try {
        // Clear the JWT cookie by setting it to an expired date

        res.cookie("jwt", "", {
            expires: new Date(0), // immediate expiration
            httpOnly: true, // Prevent client-side access to the cookie
            secure: true,
            sameSite: "none",
            path: "/", // Make sure it's cleared for the entire site
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("ERROR IN LOGOUT: " + err.message);
        next(err);
    }
});
