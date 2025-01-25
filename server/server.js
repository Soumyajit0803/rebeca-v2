require("dotenv").config();
const mongoose = require("mongoose")
const app = require("./app");

// Below snippet is used to connect to DB. This is disablled becouse we will not be needing Database for this project

// Connecting to DATABASE ->>
const DB = process.env.MONGO_CLIENT_URI.replace(
	'<db_password>',
	process.env.MONGO_CLIENT_PASSWORD
);

mongoose
	.connect(DB, {
		// <- Using Mongoose Connection
		// useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
		// useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connection established');
	})
	.catch((err) => {
		console.log('DB CONNECTION FAILED');
		console.log('ERR: ', err);
	});

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
    console.log(`Server is running on port ${PORT}`);
});
