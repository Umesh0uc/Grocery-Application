const { getAllproductsInCart, addProductInCart, deleteProductFromCart } = require('../controllers/cartController');
const disableCache = require('../middlewares/disableCache');

const router = require('express').Router();

router.get("/", disableCache, getAllproductsInCart);
router.post("/", addProductInCart);
router.delete("/:productId", deleteProductFromCart);

module.exports = router;