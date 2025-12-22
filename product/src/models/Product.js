const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        price: {
            type: Number,
            default: 0,
            min: 0
        },
        category: {
            type: String,
            default: "Other",
        },
        imageUrl: {
            type: String,
            default: "https://dummyimage.com/400x400/000/fff&text=No-Image"
        }
    },
    {
        versionKey: false,
    }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;