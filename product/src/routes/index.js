const { getAllProducts, addProduct, productExists } = require('../controllers/productController');

const router = require('express').Router();

router.get("/", getAllProducts);
router.get("/exists/:_id", productExists);
router.post("/", addProduct);

module.exports = router;