const Cart = require("../models/Cart");
const { getCount } = require("../utils/cartUtils");
const axios = require('axios');
const productServiceUrl = process.env.PRODUCT_SERVICE_URL + "/exists/";


const deleteItemFromCart = async (productId) => {
    const data = await Cart.findOneAndDelete({productId});
    return data;
};

const getProducts = async () => {
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

    return result;
};

const addProduct = async (productId, quantity=0) => {
    const existingCart = await Cart.findOne({productId: productId});
    const c = await getCount();
    if(existingCart){
        if(quantity === 0){
            const deletedCartItem = await deleteItemFromCart(productId);
            return deletedCartItem;
            // return res.json({success: true, data: deletedCartItem, error: null});
        }
        if(c >= 10 && existingCart?.quantity <= quantity){
            throw new Error('LIMIT_REACHED');
        }
        existingCart.quantity = quantity;
        const updatedItem = await existingCart.save();
        return updatedItem;
        // res.json({success: true, data: updatedItem, error: null});
    }
    if(c >= 10){
        throw new Error('LIMIT_REACHED');
    }
    const isProductFound = await axios.get(productServiceUrl + productId);
    if(isProductFound?.data?._id){
        const newCart = new Cart({productId, quantity});
        const productAdded = await newCart.save();
        // res.json({success: true, data: productAdded, error: null});
        return productAdded;
    }
    else{
        throw new Error("Product not found");
    }
};

module.exports = {
    deleteItemFromCart,
    getProducts,
    addProduct,

};