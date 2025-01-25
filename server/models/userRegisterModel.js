const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
});

const userRegisterSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Refers to the User model
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event", // Refers to the Event model
            required: true,
        },
        collegeName: {
            type: String,
            required: true,
        },
        teamName: {
            type: String, // Optional, for team events
            required: this.teamMembers.length > 0
        },
        teamMembers: [userSchema], // Array of team members (for team events)
        payment: {
            type: String,
            required: this.collegeName !== "IIEST Shibpur",
            validate: {
                validator: function (value) {
                    // Validate that the payment pic is a valid URL
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for Payment Screenshot",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('UserRegistration', userRegisterSchema)