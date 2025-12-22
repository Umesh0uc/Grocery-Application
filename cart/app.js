require("dotenv").config({quiet: true});
const port = process.env.PORT || "5003";
const mongoUrl = process.env.MONGO_URL;

const mongoose = require('mongoose');
const express = require("express");
const router = require("./src/routes");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/", router);

app.listen(port, async (err) => {
    if (err) {
        console.log("ERROR RUNNING SERVER");
        console.error(err);
        return;
    }
    
    try{
        console.log("Server running... ", port);
        await mongoose.connect(mongoUrl);
        console.log("DB connected");
    }
    catch(e){
        console.error("error: ", e?.message);
    }
});
