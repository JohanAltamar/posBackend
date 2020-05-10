const {Schema, model} = require('mongoose');

const paymentSchema = new Schema({
  paymentMethods: Array,
  departments: Array,
  cashierDefaults: Object,
  cashierCurrent: Object,
  cashierStartDay: Object,
  productionDate: Date
})

module.exports = model('payment method', paymentSchema);