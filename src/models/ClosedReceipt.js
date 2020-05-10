const {Schema, model} = require('mongoose');

const closedReceiptSchema = new Schema({
  receipt: Number,
  // clientName: {type:String, default: '', trim: true},
  clientName: {type: Schema.Types.ObjectId, ref: 'Customer'},
  total: Number,
  paymentMethod: String,
  payed: Number, 
  change: Number,
  status: {type: String, default:'active', trim: true},
  productionDate: Date,
  createdBy: String,
  updatedBy: String,
}, {
  timestamps: true
});

module.exports = model('Closed Receipts', closedReceiptSchema);