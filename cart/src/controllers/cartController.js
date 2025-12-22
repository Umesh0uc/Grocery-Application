const Cart = require("../models/Cart");
const axios = require("axios");
const { getCount } = require("../utils/cartUtils");
const { deleteItemFromCart, getProducts, addProduct } = require("../services/cartService");

const getAllproductsInCart = async (req, res) => {
    try{
        const result = await getProducts();
        res.json({success: true, data: result, error: null});
    }
    catch(e){
        console.error(e);
        res.json({success: false, data: null, error: e.message});
    }
};

const addProductInCart = async (req, res) => {
    try{
        const {_id: productId, quantity} = req.body;
        const result = await addProduct(productId, quantity);
        return res.json({success: true, data: result, error: null});
    }
    catch(e){
        console.log(e);
        res.json({success: false, data: null, error: e.message});
    }
};

const deleteProductFromCart = async (req, res) => {
    try{
        const { productId } = req.params;
        if(!productId){
            throw new Error("productId is required");
        }
        const data = await deleteItemFromCart(productId);
        if(!data){
            throw new Error('Error deleting cart item');
        }
        res.json({success: true, data: {}, error: null});
    }
    catch(e){
        console.error(e);
        res.json({success: false, data: null, error: e.message});
    }
};



module.exports = {
    getAllproductsInCart,
    addProductInCart,
    deleteProductFromCart,
}