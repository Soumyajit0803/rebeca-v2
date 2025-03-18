const mongoose = require("mongoose");

const userEnrollSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event", // Refers to the Event model
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Refers to the User model
            required: true,
        },
        teamName: {
            type: String, // Optional, for team events
            required: this.teamMembers && this.teamMembers.length > 0,
        },
        teamMembers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        },
        paymentScreenshot: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserEnroll", userEnrollSchema);
