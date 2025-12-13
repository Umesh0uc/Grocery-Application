const Cart = require("../models/Cart");
const axios = require("axios");
const productServiceUrl = process.env.PRODUCT_SERVICE_URL + "/exists/";

const getAllproductsInCart = async (req, res) => {
    try{
        const cartData = await Cart.aggregate([
            {
                $lookup: {
                    from: 'products',
                    foreignField: '_id',
                    localField: 'productId',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $project: {
                    product: {
                        $mergeObjects: ['$$ROOT', '$product']
                    }
                }
            },
            {
                $replaceWith: '$product'
            },
            {
                $unset: ['product', 'productId']
            }
        ]);
        const result = {items: cartData, count: 0, total: 0};
        cartData.forEach(item => {
            result.count+=item.quantity;
            result.total+=(item.quantity * item.price);
        });
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
        const existingCart = await Cart.findOne({productId: productId});
        if(existingCart){
            existingCart.quantity = quantity;
            const updatedItem = await existingCart.save();
            res.json({success: true, data: updatedItem, error: null});
            return;
        }
        const isProductFound = await axios.get(productServiceUrl + productId);
        if(isProductFound.data._id){
            const newCart = new Cart({productId, quantity});
            const productAdded = await newCart.save();
            res.json({success: true, data: productAdded, error: null});
            return;
        }
        else{
            throw new Error("Product not found");
        }
    }
    catch(e){
        res.json({success: false, data: null, error: e.message});
    }
};

const deleteProductFromCart = async (req, res) => {
    try{
        const { productId } = req.params;
        if(!productId){
            throw new Error("productId is required");
        }
        const data = await Cart.findOneAndDelete({productId});
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