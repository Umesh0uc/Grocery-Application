
const Product = require("../models/Product");
const { createJsonResponse } = require("../utils/responseUtils");
const { logToFile } = require("../utils/logger");

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({}, {_v: 0});
        res.json(createJsonResponse(true, products));
    }
    catch(e){
        logToFile(`getAllProducts error: ${e?.message}`);
        res.json(createJsonResponse(false, null, e?.message));
    }
};

const addProduct = async (req, res) => {
    try{
        const {name, price, category, imageUrl} = req.body;
        const newProduct = new Product({name, price, category, imageUrl});
        const data = await newProduct.save();

        res.json(data);
    }
    catch(e){
        logToFile(`addProduct error: ${e?.message}`);
        res.send("server error");
    }
};

const productExists = async (req, res) => {
    try{
        const { _id } = req.params;
        const productExists = await Product.exists({_id});
        logToFile(`productExists: ${JSON.stringify(productExists)}`);
        res.json(productExists);
    }
    catch(e){
        logToFile(`productExists error: ${e?.message}`);
        res.send("server error");
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    productExists
}