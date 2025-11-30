const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;