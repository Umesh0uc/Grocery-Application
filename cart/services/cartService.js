const Cart = require("../models/Cart");

const deleteItemFromCart = async (productId) => {
    const data = await Cart.findOneAndDelete({productId});
    return data;
};

module.exports = {
    deleteItemFromCart,
};