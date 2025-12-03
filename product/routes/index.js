const { getAllProducts, addProduct, productExists } = require('../controllers/productController');

const router = require('express').Router();

router.get("/products", getAllProducts);
router.get("/products/exists/:_id", productExists);
router.get("/products/:name/:price/:category/:imageUrl", addProduct);

module.exports = router;