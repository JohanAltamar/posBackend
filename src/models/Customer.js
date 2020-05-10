const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
  name: { type: String, trim: true, required: true },
  id: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  telephone: { type: String, trim: true, required: true },
  whatsapp: { type: String, trim: true, required: true },
  email: { type: String, trim: true },
  creditAvailable: { type: Boolean, default: false },
  creditAmount: { type: Number, default: 0 },
  creditDeadlines: { type: Number, default: 0 },
  creditBalance: { type: Number, default: 0},
  status: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = model('customers', customerSchema);