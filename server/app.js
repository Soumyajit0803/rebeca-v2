const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config({ path: "./.env" });
console.log(`ENV = ${process.env.PORT}`);

app.use(cors);

module.exports = app