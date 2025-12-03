const { getAllproductsInCart, addProductInCart, deleteProductFromCart } = require('../controllers/cartController');

const router = require('express').Router();

router.get("/cart", getAllproductsInCart);
router.post("/cart", addProductInCart);
router.delete("/cart/:productId", deleteProductFromCart);

module.exports = router;