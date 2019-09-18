const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB database connection successfull!"))
    .catch(err => console.log(err)
);

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});