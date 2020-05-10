const {Schema, model} = require('mongoose');

const shoppingCartSchema = new Schema({
  products: {type: Array, required: true},
  username: {type: String, required: true}
});

module.exports = model('ShoppingCart', shoppingCartSchema);