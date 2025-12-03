require("dotenv").config({quiet: true});
const port = process.env.PORT || "5003";
const mongoUrl = process.env.MONGO_URL;

const mongoose = require('mongoose');
const express = require("express");
const router = require("./routes");

const app = express();

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
