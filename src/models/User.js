const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {type:String, trim: true, required: true},
  username: {type:String, trim: true, required: true, unique: true},
  id: {type: String, trim: true, required: true},
  cellphone:{type:String, trim: true, required: true},
  whatsapp:{type:String, trim: true, required: true},
  address:{type:String, trim: true, required: true},
  email:{type:String, trim: true, required: true},
  password: {type: String, trim:true, required: true},
  role: {type: String, trim:true, required: true},
  status: {type: Boolean, default: true},
  createdBy: String
}, {
  timestamps: true
});

module.exports = model('User', userSchema);