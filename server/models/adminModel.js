const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: false,
        trim:true,
        enum: {
            values: ["Organiser", "Facilitator"],
            message: 'Type must be either "Organiser" or "Facilitator"',
        },
    }
});

module.exports = mongoose.model("Admin", adminSchema);