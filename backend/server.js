const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
//express server
const app = express();
const port = 5000;
//middleware
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


const usersRouter = require('./routes/users');
const tribRouter = require('./routes/tribunaux');
const serviceRouter = require('./routes/services');

app.use('/users', usersRouter);
app.use('/tribunaux', tribRouter);
app.use('/tribunaux/services', serviceRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});