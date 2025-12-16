const Cart = require("../models/Cart");
const axios = require("axios");
const { getCount } = require("../utils/cartUtils");
const { deleteItemFromCart } = require("../services/cartService");
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
        const c = await getCount();
        if(existingCart){
            if(quantity === 0){
                const deletedCartItem = await deleteItemFromCart(productId);
                return res.json({success: true, data: deletedCartItem, error: null});
            }
            if(c >= 10 && existingCart.quantity <= quantity){
                throw new Error('LIMIT_REACHED');
            }
            existingCart.quantity = quantity;
            const updatedItem = await existingCart.save();
            res.json({success: true, data: updatedItem, error: null});
            return;
        }
        if(c >= 10){
            throw new Error('LIMIT_REACHED');
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