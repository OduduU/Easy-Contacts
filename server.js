const express = require('express');
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const app = express();

// Define Routes
app.use('/api/users', usersRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/auth', authRoute);
app.get('/', (req, res) => res.json({msg:'Hello world!'}));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));