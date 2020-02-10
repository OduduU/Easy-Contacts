const express = require('express');
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const connectDB = require('./config/db');


// Connect Database
connectDB()

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', usersRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/auth', authRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));