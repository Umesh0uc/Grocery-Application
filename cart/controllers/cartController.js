const Cart = require("../models/Cart");

const getAllproductsInCart = async (req, res) => {
    try{
        res.json([]);
    }
    catch(e){
        console.error(e);
        res.json({succss: false});
    }
};

const addProductInCart = async (req, res) => {
    try{
        const {productId, quantity} = req.params;
        const newCart = new Cart({productId, quantity});
        console.log(newCart);
        res.send("adding in progress");
    }
    catch(e){
        console.error(e);
        res.json({succss: false});
    }
};



module.exports = {
    getAllproductsInCart,
    addProductInCart,
}