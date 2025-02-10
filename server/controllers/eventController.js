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