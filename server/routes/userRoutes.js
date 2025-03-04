const express = require('express')
const userController = require("../controllers/userController")

const Router = express.Router()
Router.post("/create", userController.createUser)
Router.get("/all", userController.getAllUsers)
Router.patch("/update", userController.updateUser)
Router.delete("/delete", userController.deleteUser)

module.exports = Router