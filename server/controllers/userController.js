const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

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
        const allUsers = await User.find({ $or: [{ role: 'developer' }, { role: 'admin' }] });
        
        return res.status(200).json({ message: "success", data: allUsers });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.updateUser = catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);
        var updatedUser;
        if (req.body._id) {
            updatedUser = await User.findByIdAndUpdate(
                req.body._id,
                { $set: req.body },
                { new: true, runValidators: true }
            );
        } else {
            updatedUser = await User.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "success", data: updatedUser });
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
