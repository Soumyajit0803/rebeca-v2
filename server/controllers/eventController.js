const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

exports.createEvent = catchAsync(async (req, res, next) => {
    try {
        const eventData = new Event({
            ...req.body,
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
        console.log("Event query: " + req.query);

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

        const updatedEvent = await Event.findByIdAndUpdate(
            req.body._id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        console.log(updatedEvent);
        

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event to be updated not found" });
        }

        return res.status(200).json({ message: "success", data: updatedEvent });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
    try {
        const allEvents = await Event.find().populate("mainCoordinators")
        return res.status(200).json({message: "success", data: allEvents})

    } catch(err) {
        console.log(err.message);
        next(err)
    }
})
