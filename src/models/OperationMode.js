/** This model is used to set operation mode, that means using Barcode scanner 
 * readings, weight scales readings and manual operations, where user enters price 
 * and department manually */

 const {Schema, model} = require('mongoose');

 const OperationModeSchema = new Schema({
   username: {type: String, required: true, unique: true},
   mode: {type: String, trim: true, default: 'barcode'}
 });

 module.exports = model('Operation modes', OperationModeSchema);