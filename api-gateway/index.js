require('dotenv').config({quiet: true});
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const port = process.env.PORT || "5000";
const app = express();

const productServiceUrl = process.env.PRODUCT_SERVICE_URL; 
const cartServiceUrl = process.env.CART_SERVICE_URL; 

app.use(morgan('combined'));

app.use('/api/products', createProxyMiddleware({
    target: productServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/products': '/products'
    }
}));
app.use('/api/cart', createProxyMiddleware({
    target: cartServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/cart': ''
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