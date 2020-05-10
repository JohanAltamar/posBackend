const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  name: {type: String, trim: true, required: true},
  department: {type: String, trim: true, required: true},
  PLU: {type: String, required: true, unique: true},
  barcode: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  cost: {type: Number, default: 0},
  stock: {type: Number},
  isWeighted: {type: Boolean, default: false},
  status: {type: Boolean, default: true}
},{
  timestamps: true
});

module.exports = model('Products', productSchema);