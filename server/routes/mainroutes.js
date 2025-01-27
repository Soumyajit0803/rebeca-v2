const express = require("express");
const imageController = require("../controllers/imageController");
const { upload } = require("../utils/multer");
const Router = express.Router();

// All your routes will go here
Router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to rebeca backend." });
});
Router.post("/profile/upload", upload.single("image"), imageController.uploadImage);
module.exports = Router;
