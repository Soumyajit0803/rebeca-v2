const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const UserEnroll = require("../models/userEnrollModel");

exports.enrollUser = catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);

        const { eventId, userId } = req.body;

        // Check if user is already registered
        const existingEnrollment = await UserEnroll.findOne({
            eventId,
            $or: [{ userId }, { teamMembers: userId }],
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: "User is already registered or part of a team for this event." });
        }

        const userEnrollData = new UserEnroll({
            ...req.body,
        });
        await userEnrollData.save();
        return res.status(201).json({ message: "success" });
    } catch (err) {
        console.log("Error while enrolling user" + ` message: ${err.message}`);
        next(err);
    }
});

exports.isUserRegistered = catchAsync(async (req, res, next) => {
    try {
        const { eventId, userId } = req.query;

        const existingEnrollment = await UserEnroll.findOne({
            eventId,
            $or: [{ userId }, { teamMembers: userId }],
        });

        if (existingEnrollment) {
            return res.status(200).json({ isRegistered: true, message: "User is already registered for this event." });
        } else {
            return res.status(200).json({ isRegistered: false, message: "User is not registered for this event." });
        }
    } catch (err) {
        console.error("Error checking user registration", err);
        next(err);
    }
});

exports.getAllMembersNotInEvent = catchAsync(async (req, res, next) => {
    // return set(All) - set(registered)
    try {
        const { eventId } = req.query;

        // Find all users registered in the event either as a leader or a team member
        const enrolled = await UserEnroll.find({ eventId }).select("userId teamMembers");

        const enrolledIDs = new Set();
        enrolled.forEach((e) => {
            enrolledIDs.add(e.userId.toString());
            e.teamMembers.forEach((member) => enrolledIDs.add(member.toString()));
        });

        // Find all users not present in the enrolledIDs list
        const unEnrolled = await User.find({ _id: { $nin: Array.from(enrolledIDs) } });

        return res.status(200).json({ message: "success", data: unEnrolled });
    } catch (err) {
        console.error("Error fetching unregistered users", err);
        next(err);
    }
});
