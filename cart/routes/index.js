const { getAllproductsInCart, addProductInCart, deleteProductFromCart } = require('../controllers/cartController');

const router = require('express').Router();

router.get("/", getAllproductsInCart);
router.post("/", addProductInCart);
router.delete("/:productId", deleteProductFromCart);

module.exports = router;