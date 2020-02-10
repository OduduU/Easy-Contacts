const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.mongoURI;



const connectDB = () => {
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
		})
		.then(() => console.log("MondoDB Connected..."))
        .catch(err => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDB;
