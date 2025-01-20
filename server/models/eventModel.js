const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
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
});

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
                    return this.startTime < value;
                },
                message: "End time must be after start time",
            },
        },
        venue: {
            type: String,
            required: [true, "Venue is required"],
            trim: true,
        },
        rulesDoc: {
            type: String,
            required: [true, 'Rules document URL is required'],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(pdf|doc|docx)$/i.test(value);
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
        registrationFee: {
            type: Number,
            required: [true, "Registration fee is required"],
        },
        galleryImages: {
            type: [String], // Array of image URLs
            validate: {
                validator: function (images) {
                    return images.every((image) => /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(image));
                },
                message: "Invalid URL(s) in gallery images",
            },
        },
        mainCoordinators: {
            type: [memberSchema],
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
