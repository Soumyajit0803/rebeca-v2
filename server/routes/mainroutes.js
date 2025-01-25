const express = require('express');

const Router = express.Router();

// All your routes will go here
Router.get("/", (req, res)=>{
    res.status(200).json({ message: 'Welcome to backend. Now close this' });
});

module.exports = Router;
