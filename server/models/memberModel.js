const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Mandatory Field: name"],
            trim: true,
            minlength: [5, "Name must be at least 3 characters long"], // Minimum name length
            maxlength: [50, "Name cannot exceed 50 characters"], // Maximum name length
        },
        profilePic: {
            type: String,
            required: [true, "Mandatory Field: profilePic"],
            validate: {
                validator: function (value) {
                    // Validate that the profilePic is a valid URL
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for profilePic",
            },
        },
        role: {
            type: String,
            required: [true, "Mandatory Field: role"],
        },
        teamName: {
            type: String,
            required: [true, "Mandatory Field: teamName"],
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
