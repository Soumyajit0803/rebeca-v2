const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing Field: name"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Missing Field: image"],
            trim: true,
        },
        role: {
            type: String,
            required: false,
            trim:true,
            enum: {
                values: ["Organiser", "Facilitator"],
                message: 'Type must be either "Organiser" or "Facilitator"',
            },
        },
        team: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Missing Field: Email"],
            trim: true,
            unique: true
        },
        phone: {
            type: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);