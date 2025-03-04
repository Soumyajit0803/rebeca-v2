const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, "Event name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        startTime: {
            type: Date,
            required: [true, "Start time is required"],
        },
        endTime: {
            type: Date,
            required: [true, "End time is required"],
            validate: {
                validator: function (value) {
                    return this.startTime && this.startTime < value;
                },
                message: "End time must be after start time",
            },
        },
        venue: {
            type: String,
            required: [true, "Venue is required"],
            trim: true,
        },
        rulesDocURL: {
            type: String,
            required: [true, 'Rules document URL is required'],
            trim: true,
            validate: {
                validator: function (value) {
                    return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
.test(value)
                },
                message: 'Invalid URL for rules document. Only .pdf, .doc, or .docx are allowed.',
            },
        },
        minTeamSize: {
            type: Number,
            required: function () {
                return this.type === 'team';
            },
            validate: {
                validator: function (value) {
                    return this.maxTeamSize
                        ? value <= this.maxTeamSize
                        : true; // Ensure minTeamSize ≤ maxTeamSize
                },
                message: 'Minimum team size cannot exceed maximum team size',
            },
        },
        maxTeamSize: {
            type: Number,
            required: function () {
                return this.type === 'team';
            },
            min: [2, 'Maximum team size must be at least 2'],
            validate: {
                validator: function (value) {
                    return this.minTeamSize
                        ? value >= this.minTeamSize
                        : true; // Ensure maxTeamSize ≥ minTeamSize
                },
                message: 'Maximum team size cannot be smaller than minimum team size',
            },
        },
        type: {
            type: String,
            required: [true, "Event type is required"],
            enum: {
                values: ["team", "single"],
                message: 'Type must be either "team" or "single"',
            },
        },
        poster: {
            type: String,
            required: [true, "Poster URL is required"],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for poster",
            },
        },
        thumbnail: {
            type: String,
            required: [true, "ThumbNail URL is required"],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for thumbnail",
            },
        },
        registrationFee: {
            type: Number,
            required: [true, "Registration fee is required"],
        },
        mainCoordinators: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            validate: {
                validator: function (coordinators) {
                    return coordinators.length > 0;
                },
                message: "There must be at least one main coordinator",
            },
        },
    },
    { timestamps: true }
); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Event", eventSchema);
