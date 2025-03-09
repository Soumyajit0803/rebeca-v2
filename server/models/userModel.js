const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing Field: name"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Missing Field: image"],
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim:true,
            default: "user",
            enum: {
                values: ["admin", "user", "developer"], // developer is a secret role :)
                message: 'role must be either "admin" or "user"',
            },
        },
        team: {
            type: String,
            trim: true,
        },
        position: {
            type: String,
            trim: true,
            // enum: {
            //     values: ["head", "associate head", "associate", null],
            //     message: 'position must be in {head, associate head, associate}'
            // },
            required: false
        },
        email: {
            type: String,
            required: [true, "Missing Field: Email"],
            trim: true,
            unique: true
        },
        phone: {
            type: String,
        },
        dept: {
            type: String,
            trim: true,
            validate: {
                validator: (x) => x.length > 5,
                message: "ERR: dept: Please mention full department name"
            }
        },
        passout_year: {
            type: Number,
        },
        college: {
            type: String,
            trim: true,
            required: [true, "Missing Field: College Name"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);