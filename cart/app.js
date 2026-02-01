require("dotenv").config({quiet: true});
const port = process.env.PORT || "5003";
const mongoUrl = process.env.MONGO_URL;

const mongoose = require('mongoose');
const express = require("express");
const router = require("./src/routes");
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const { logToFile } = require('./src/utils/logger');

// Ensure logs directory exists
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Create a write stream for morgan
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

const app = express();

// Log HTTP requests to access.log
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());

app.use("/", router);


app.listen(port, async (err) => {
    if (err) {
        logToFile("ERROR RUNNING SERVER");
        logToFile(err?.toString());
        return;
    }
    try {
        logToFile(`Server running... ${port}`);
        await mongoose.connect(mongoUrl);
        logToFile("DB connected");
    } catch (e) {
        logToFile(`error: ${e?.message}`);
    }
});
