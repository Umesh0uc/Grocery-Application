const { getAllproductsInCart, addProductInCart } = require('../controllers/cartController');

const router = require('express').Router();

router.get("/cart", getAllproductsInCart);
// router.get("/cart/:productId/:quantity", addProductInCart);

module.exports = router;