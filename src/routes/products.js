const { Router } = require('express');
const router = Router();

const { getProducts, createProduct, getProduct, updateProduct,
  deleteProduct, updateInventory, getProductById,
  getProductsStartedWith, updateStockPrices } = require('../controllers/products.controller');

router.route('/')
  .get(getProducts)
  .post(createProduct);

//Used to search products by PLU or barcode
router.route('/search') 
  .get(getProduct);

//Update product stock after selling or returning products
router.route('/stock').put(updateInventory)

//Used to look for products with regex
router.route('/regex').get(getProductsStartedWith)

//Used to update whole stock prices, departments or products
router.route('/price_update').get(updateStockPrices)

//Used to update or delete a known product. You have to know the ID.
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;