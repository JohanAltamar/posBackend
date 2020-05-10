const paymentMethodsCtrl = {};

const PaymentMethod = require('../models/PaymentMethod');

paymentMethodsCtrl.getPaymentMethods = async(req,res) => {
  try{
    const methods = await PaymentMethod.find();
    res.json(methods);
  }
  catch(err){
    res.status(400).json({
      error: err
    });
    res.send({error: 'Bad request'})
  }
}

paymentMethodsCtrl.getTotals = async(req,res) => {
  try{
    const methods = await PaymentMethod.findOne(); 
    res.json(methods);
  }
  catch(err){
    res.status(400).json({
      error: err
    });
    res.send({error: 'Bad request'})
  }
}

paymentMethodsCtrl.updateTotals = async(req,res) => {
  try{
    const {method, amount} = req.body;
    var current = await PaymentMethod.findOne();
    var _id= current._id
    var cashierObj = current.cashierCurrent
    cashierObj[method] += amount;
    await PaymentMethod.findOneAndUpdate({_id},{
      cashierCurrent: cashierObj
    })
    res.json('Cashier updated successfully'); 
  }
  catch(err){
    res.status(400).json({
      error: err
    });
    res.send({error: 'Bad request'})
  }
}

// paymentMethodsCtrl.getPaymentMethods = async(req,res) => {
//   try{

//   }
//   catch(err){
//     res.status(400).json({
//       error: err
//     });
//     res.send({error: 'Bad request'})
//   }
// }
module.exports = paymentMethodsCtrl;