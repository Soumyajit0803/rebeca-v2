const express = require('express')
const userEnroll = require("../controllers/userEnrollController")

const Router = express.Router()
Router.post("/enroll", userEnroll.enrollUser)
Router.get("/getAllNotInEvent", userEnroll.getAllMembersNotInEvent)
Router.get("/isUserRegistered", userEnroll.isUserRegistered)
Router.get("/getAllEnrollments", userEnroll.getAllEnrollments)


module.exports = Router