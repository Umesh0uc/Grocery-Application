const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, "Quantity cannot be less than 0"],
        max: [10, "Cart cannot accept more than 10 items"],
        required: true
    }
},{
    versionKey: false,
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;