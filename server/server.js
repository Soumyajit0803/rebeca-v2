require("dotenv").config();
// const mongoose = require("mongoose")
const app = require("./app");

// Catching uncaught exception ->>
process.on("unCaughtException", (err) => {
    console.log(`UNCAUGHT EXCEPTION -> ${err.name} - ${err.message}`);
    console.log("App SHUTTING DOWN...");
    process.exit(1); // <- Then will shut down the server.
});

// Catching unHandleled Rejections ->
process.on("unhandledRejection", (err) => {
    console.log(`UNHANDELLED REJECTION -> ${err.name} - ${err.message}`);
    console.log(err);
    console.log("App SHUTTING DOWN...");
    server.close(() => {
        // <- This will first terminate all requests

        process.exit(1); // <- Then will shut down the server.
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
