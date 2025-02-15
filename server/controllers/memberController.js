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
        return res.status(201).json({ message: "success", data: memberData });
    } catch (err) {
        console.log("Error while adding member" + ` message: ${err.message}`);
        next(err)
    }
});

exports.getAllMembers = catchAsync(async (req, res, next) => {
    try {
        const allMembers = await Member.find()
        return res.status(200).json({message: "success", data: allMembers})

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
            return res.status(404).json({ message: "Member ID not found"});
        }

        return res.status(200).json({message: 'success', data: updatedMember})
    } catch(err) {
        console.log(err.message);
        next(err)
    }
})

exports.deleteMember = catchAsync(async (req, res, next) => {
    try {
        const id = req.query._id
        const deletedMember = await Member.findByIdAndDelete(id)
        if (!deletedMember) {
            return res.status(404).json({message: "Member to be deleted not found"})
        } else{
            return res.status(204).json({message: "success", data: deletedMember})
        }

    } catch(err) {
        next(err)
    }
})
