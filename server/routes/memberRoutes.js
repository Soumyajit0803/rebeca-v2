const express = require('express')
const memberController = require("../controllers/memberController")

const Router = express.Router()
Router.post("/create", memberController.createMember)
Router.get("/all", memberController.getAllMembers)
Router.patch("/update", memberController.updateMember)
Router.delete("/delete", memberController.deleteMember)

module.exports = Router