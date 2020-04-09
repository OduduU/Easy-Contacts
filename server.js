const express = require("express");
const contactsRoute = require("./routes/contacts");
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const connectDB = require("./config/db");
const path = require("path");

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", usersRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/auth", authRoute);

//  Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
