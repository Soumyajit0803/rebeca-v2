const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Member = require("../models/memberModel");

exports.createMember = catchAsync(async (req, res, next) => {
    try {
        const memberData = new Member({
            ...req.body,
        });
        await memberData.save();
        return res.json({ message: "success", data: memberData });
    } catch (err) {
        console.log("Error while adding member" + ` message: ${err.message}`);
        next(err)
    }
});
