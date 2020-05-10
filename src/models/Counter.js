const {Schema, model} = require('mongoose');

const counterSchema = new Schema({
  operations: Number,
  receipt: Number,
  yesterday: Number,
  today: Number,
  last7days:Number,
  last30days:Number
});

module.exports = model('Counters', counterSchema);