const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB is connected'))
    .catch(() => console.log('MongoDB connection error'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running at', PORT);
});