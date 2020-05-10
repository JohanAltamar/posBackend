const { Router } = require('express');
const router = Router();

const { getShoppingCart, add2ShoppingCart, deleteLastItem, deleteItemByBarcode} = require('../controllers/shoppingCarts.controller');

router.route('/:username')
  .get(getShoppingCart)
  .post(add2ShoppingCart)
  .put(deleteLastItem)

router.route('/:username/:barcode')
.delete(deleteItemByBarcode);

module.exports = router;