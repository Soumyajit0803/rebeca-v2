const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const Member = require("../models/memberModel");

exports.createMember = catchAsync(async (req, res, next) => {
    try {
        console.log(req.body);
        
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

exports.getAllMembers = catchAsync(async (req, res, next) => {
    try {
        const allMembers = await Member.find()
        return res.json({message: "success", data: allMembers})

    } catch(err) {
        console.log(err.message);
        next(err)
    }
})

exports.updateMember = catchAsync(async (req, res, next) => {
    
    try {
        console.log(req.body);
        
        const updatedMember = await Member.findByIdAndUpdate(
            req.body._id,
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if (!updatedMember) {
            return res.json({ message: "failed to find the selected member"});
        }

        return res.json({message: 'success', data: updatedMember})
    } catch(err) {
        console.log(err.message);
        next(err)
    }
})
