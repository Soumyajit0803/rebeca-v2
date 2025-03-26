const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const { deleteImage } = require("../utils/cloudinary");

exports.createEvent = catchAsync(async (req, res, next) => {
    try {
        const alreadyExists = await Event.findOne({ eventName: req.body.eventName });
        if (alreadyExists)
            return res.status(400).json({ message: "An Event With this Name Already Exists", data: alreadyExists });
        const eventData = new Event({
            ...req.body,
            rounds: JSON.parse(req.body.rounds),
            mainCoordinators: JSON.parse(req.body.mainCoordinators)
        });
        await eventData.save();
        return res.status(201).json({ message: "success", data: eventData });
    } catch (err) {
        console.log("Error while adding event ||" + ` message: ${err.message}`);
        next(err);
    }
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
    try {
        const id = req.query._id;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event to be deleted not found" });
        } else {
            return res.status(204).json({ message: "success", data: deletedEvent });
        }
    } catch (err) {
        next(err);
    }
});

exports.updateEvent = catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);
        const updated = { ...req.body };
        if (updated.rounds) updated.rounds = JSON.parse(updated.rounds);
        if (updated.mainCoordinators) updated.mainCoordinators = JSON.parse(updated.mainCoordinators);

        const oldEvent = await Event.findByIdAndUpdate(
            req.body._id,
            { ...updated },
            { new: false, runValidators: true }
        );

        console.log(oldEvent);

        if (!oldEvent) {
            return res.status(404).json({ message: "Event to be updated not found" });
        }
        if (updated.thumbnail && oldEvent.thumbnail) {
            await deleteImage(oldEvent.thumbnail); // Delete only the OLD image
            console.log("Old image deleted:", oldEvent.thumbnail);
        }
        if (updated.poster && oldEvent.poster) {
            await deleteImage(oldEvent.poster); // Delete only the OLD image
            console.log("Old image deleted:", oldEvent.poster);
        }

        return res.status(200).json({ message: "success" });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
    try {
        const email = req.query.email;
        const allEvents = await Event.find().populate("mainCoordinators");

        if (email === "null") {
            return res.status(200).json({ message: "success", data: allEvents });
        } else {
            const filteredEvents = allEvents.filter((event) =>
                event.mainCoordinators.some((coordinator) => coordinator.email === email)
            );
            return res.status(200).json({ message: "success", data: filteredEvents });
        }
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});
