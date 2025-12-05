const Product = require("../models/Product");
const { createJsonResponse } = require("../utils/responseUtils");

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({}, {_v: 0});
        res.json(createJsonResponse(true, products));
    }
    catch(e){
        console.error(e?.message);
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
        console.log(e.message);
        res.send("server error");
    }
};

const productExists = async (req, res) => {
    try{
        const { _id } = req.params;
        const productExists = await Product.exists({_id});
        console.log(productExists);
        res.json(productExists);
    }
    catch(e){
        console.log(e.message);
        res.send("server error");
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    productExists
}