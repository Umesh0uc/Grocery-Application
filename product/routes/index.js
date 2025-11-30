const { getAllProducts, addProduct } = require('../controllers/productController');

const router = require('express').Router();

router.get("/products", getAllProducts);
router.get("/products/:name/:price/:category/:imageUrl", addProduct);

module.exports = router;