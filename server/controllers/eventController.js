const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

exports.createEvent = catchAsync(async(req, res, next)=>{
    try {
        const eventData = new Event({
            ...req.body
        });
        await eventData.save();
        return res.json({ message: "success", data: eventData });
    }catch(err){
        console.log("Error while adding event ||" + ` message: ${err.message}`);
        next(err)
    }
})

exports.getAllEvents = catchAsync(async (req, res, next) => {
    try {
        const allEvents = await Event.find().populate("mainCoordinators")
        return res.json({message: "success", data: allEvents})

    } catch(err) {
        console.log(err.message);
        next(err)
    }
})