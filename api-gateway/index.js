require('dotenv').config({quiet: true});
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { logToFile } = require('./logger');

// Ensure logs directory exists
const logDirectory = path.join(__dirname, './logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Create a write stream for morgan
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || "5000";
const app = express();

const productServiceUrl = process.env.PRODUCT_SERVICE_URL; 
const cartServiceUrl = process.env.CART_SERVICE_URL; 

// Log HTTP requests to access.log
app.use(morgan('combined', { stream: accessLogStream }));

const corsOptions = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));

app.use('/api/products', createProxyMiddleware({
    target: productServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/products': '/'
    }
}));
app.use('/api/cart', createProxyMiddleware({
    target: cartServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/cart': '/'
    }
}));
app.use(express.json());

app.listen(port, (err) => {
    if (err) {
        logToFile("ERROR RUNNING GATEWAY");
        logToFile(err?.toString());
        return;
    }
    try {
        logToFile(`Gateway running... ${port}`);
    } catch (e) {
        logToFile(`error: ${e?.message}`);
    }
});