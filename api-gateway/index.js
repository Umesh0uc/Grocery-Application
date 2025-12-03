require('dotenv').config({quiet: true});
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const port = process.env.PORT || "5000";
const app = express();

app.use(morgan('combined'));

app.use('/api', createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}));
app.use('/api', createProxyMiddleware({
    target: process.env.CARD_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}));

app.listen(port, (err) => {
    if(err){
        console.log("ERROR RUNNING GATEWAY");
        console.error(err);
        return;
    }

    console.log("GATE RUNNING AT ", port);

})