const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, "Missing Field: Event name"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Missing field: description"],
        },
        rounds: [
            {
                roundno: {
                    type: Number,
                    required: [true, "Missing Field: Round Number"],
                },
                startTime: {
                    type: Date,
                    required: [true, "Missing Field: start time"],
                },
                endTime: {
                    type: Date,
                    required: [true, "Missing Field: endtime"],
                    validate: {
                        validator: function (value) {
                            return this.startTime && this.startTime < value;
                        },
                        message: "Validation err on endtime: End time must be after start time",
                    },
                },
                venue: {
                    type: String,
                    required: [true, "Missing Field: Round: venue"],
                    trim: true,
                },
                description: {
                    type: String,
                    trim: true,
                },
                roundname: {
                    type: String,
                    trim: true,
                    required: [true, "Missing Field: Round: roundname"]
                },
            },
        ],
        rulesDocURL: {
            type: String,
            trim: true,
            // validate: {
            //     validator: function (value) {
            //         return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(value);
            //     },
            //     message: 'validation err: rulesdoc: Invalid URL for rules document. Only .pdf, .doc, or .docx are allowed.',
            // },
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
                message: 'Validation err: minteamsize: Minimum team size cannot exceed maximum team size',
            },
        },
        maxTeamSize: {
            type: Number,
            required: function () {
                return this.type === 'team';
            },
            min: [2, 'Validation errMaximum team size must be at least 2'],
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
        paymentQR: {
            type: String
        },
        assets: {
            type: String
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