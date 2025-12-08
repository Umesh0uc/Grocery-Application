const Cart = require("../models/Cart");
const axios = require("axios");
const productServiceUrl = process.env.PRODUCT_SERVICE_URL + "/products/exists/";

const getAllproductsInCart = async (req, res) => {
    try{
        const cartData = await Cart.find({});
        res.json(cartData);
    }
    catch(e){
        console.error(e);
        res.json({succss: false});
    }
};

const addProductInCart = async (req, res) => {
    try{
        const {productId, quantity} = req.body;
        const existingCart = await Cart.findOne({productId: productId});
        if(existingCart){
            existingCart.quantity = quantity;
            await existingCart.save();
            res.json("Quantity updated");
            return;
        }
        const isProductFound = await axios.get(productServiceUrl + productId);
        if(isProductFound.data._id){
            const newCart = new Cart({productId, quantity});
            const productAdded = await newCart.save();
            res.send("Added to cart successfully");
            return;
        }
        else{
            throw new Error("Product not found");
        }
    }
    catch(e){
        res.json({succss: false, error: e.message});
    }
};

const deleteProductFromCart = async (req, res) => {
    try{
        const { productId } = req.params;
        if(!productId){
            throw new Error("productId is required");
        }
        const newCart = new Cart({productId, quantity});
        console.log(newCart);
        await newCart.save();
    }
    catch(e){
        console.error(e);
        res.json({succss: false});
    }
};



module.exports = {
    getAllproductsInCart,
    addProductInCart,
    deleteProductFromCart,
}