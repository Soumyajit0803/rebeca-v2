const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing Field: name"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Missing Field: image"],
            validate: {
                validator: function (value) {
                    // Validate that the image is a valid URL
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for image",
            },
            trim: true,
        },
        role: {
            type: String,
            required: [true, "Missing Field: role"],
            trim: true,
        },
        team: {
            type: String,
            required: [true, "Missing Field: team"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Missing Field: Email"],
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: [/^\+91[6789]\d{9}$/, "Invalid phone number format"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
