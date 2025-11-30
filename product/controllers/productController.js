const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({}, {_id: false, _v: 0});
        res.json(products);
    }
    catch(e){
        console.error(e?.message);
        res.send(e?.message);
    }
};

const addProduct = async (req, res) => {
    try{
        const {name, price, category, imageUrl} = req.params;
        const newProduct = new Product({name, price, category, imageUrl});
        const data = await newProduct.save();

        res.json(data);
    }
    catch(e){
        console.log(e);
        res.send("server error");
    }
};

module.exports = {
    getAllProducts,
    addProduct
}