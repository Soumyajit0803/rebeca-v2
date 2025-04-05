const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const UserEnroll = require("../models/userEnrollModel");
const User = require("../models/userModel");
const Email = require("../utils/nodemailer");

exports.enrollUser = catchAsync(async (req, res, next) => {
    const { body } = req;
    console.log("EnrollData to be pushed from here");
    console.log(body);

    const teamMembers = body.teamMembers ? JSON.parse(body.teamMembers) : [];

    const members = await User.find({ _id: { $in: teamMembers } });
    const leader = await User.findById(body.userId);

    const leaderpost = {name: leader.name, email: leader.email};
    const memberpost = members.map((v)=>{return {name: v.name, email: v.email}});

    try {
        // Check if user is already registered
        // const existingEnrollment = await UserEnroll.findOne({
        //     eventId: body.eventId,
        //     $or: [{ userId: body.userId }, { teamMembers: body.userId }],
        // });
        const existingEnrollment = false;
        if (existingEnrollment) {
            return res.status(400).json({ message: "User is already registered or part of a team for this event." });
        }

        const userEnrollData = new UserEnroll({
            ...body,
            teamMembers: members ? members : null,
        });
        await userEnrollData.save();

        for (let member of members) {
            const email = new Email(member, body.eventSlug, body.eventName, memberpost, leaderpost);
            await email.sendRegister();
        }

        const email = new Email(leader, body.eventSlug, body.eventName,memberpost, leaderpost);
        await email.sendRegister();

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
        console.log("This is eventID to fetch:");
        console.log(req.query);

        // Find all users registered in the event either as a leader or a team member
        const enrolled = await UserEnroll.find({ _id: eventId }).select("userId teamMembers");

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

exports.getAllEnrollments = catchAsync(async (req, res, next) => {
    try {
        const { eventId } = req.query;
        const allEnrolls = await UserEnroll.find({ eventId }).populate("userId").populate("teamMembers");
        return res.status(200).json(allEnrolls);
    } catch (err) {
        console.log("Error fetching enrollment data", err);
        next(err);
    }
});
