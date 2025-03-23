const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const { deleteImage } = require("../utils/cloudinary");
const Email = require("../utils/nodemailer");

exports.createUser = catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);

        const userData = new User({
            ...req.body,
        });
        await userData.save();
        return res.status(201).json({ message: "success", data: userData });
    } catch (err) {
        console.log("Error while adding user" + ` message: ${err.message}`);
        next(err);
    }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    try {
        const filter = { college: { $ne: null } };
        if (req.query.admin && req.query.admin === "true") {
            filter.role = {$ne: 'user'}
        }
        const allUsers = await User.find(filter);
        return res.status(200).json({ message: "success", data: allUsers });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.updateUser = catchAsync(async (req, res, next) => {
    try {
        // Update user and get the old document before update
        const oldUser = await User.findOneAndUpdate(
            req.body._id ? { _id: req.body._id } : { email: req.body.email },
            { $set: req.body },
            { new: false, runValidators: true } // Get old data before updating
        );

        if (!oldUser) {
            return res.status(404).json({ message: "User not found" });
        } else {
            console.log(oldUser);
        }

        // Delete old image if a new one is provided
        if (req.body.image && oldUser.image) {
            await deleteImage(oldUser.image); // Delete only the OLD image
            console.log("Old image deleted:", oldUser.image);
        }

        const email = new Email(
            { email: oldUser.email, name: req.body.name || oldUser.name }, 
            null, 
            null, 
            null,  // members (optional)
            null,  // leader (optional)
            null,  // url (optional)
            req.body // updatedFields
        );
        await email.sendAccountUpdate();

        return res.status(200).json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    try {
        const id = req.query._id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User to be deleted not found" });
        } else {
            return res.status(204).json({ message: "success" });
        }
    } catch (err) {
        next(err);
    }
});
