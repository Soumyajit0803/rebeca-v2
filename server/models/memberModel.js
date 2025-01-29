const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Mandatory Field: name"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Mandatory Field: image"],
            validate: {
                validator: function (value) {
                    // Validate that the image is a valid URL
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for image",
            },
            trim: true
        },
        role: {
            type: String,
            required: [true, "Mandatory Field: role"],
            trim: true
        },
        team: {
            type: String,
            required: [true, "Mandatory Field: team"],
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
