const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config({ path: "./.env" });
console.log(`ENV = ${process.env.PORT}`);

app.use(cors);

const router = require('./routes/routes');
const authRouter = require('./routes/authRoutes'); // <- NEW LINE
const AppError = require('./utils/appError');
// const errorController = require('./controllers/errorController');

// app.use(compression());

app.use('/api/v1/auth/', authRouter); // <- NEW LINE
app.use('/api/v1/', router);

module.exports = app