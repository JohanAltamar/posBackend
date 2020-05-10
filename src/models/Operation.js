const {Schema, model} = require('mongoose');

const operationSchema = new Schema({
  receipt: {type: Number, required: true},
  name: {type: String, trim: true, required: true},
  PLU: {type: String, trim:true, required: true},
  department: {type: String, trim: true, required: true},
  qty: {type: Number, required: true},
  price: {type: Number, required: true},
  barcode:{type: String, trim: true},
  status: {type: String, trim: true, default: 'active'}, //to manage if a product is sold(active)  or if was returned(returned)
  productionDate: Date,
  createdBy: String,
  updatedBy: String,
},{
  timestamps: true
});

module.exports = model('Operations', operationSchema);