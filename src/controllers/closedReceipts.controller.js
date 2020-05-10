const closedReceiptCtrl = {};

const ClosedReceipt = require('../models/ClosedReceipt');
const Feature = require('../models/PaymentMethod');

closedReceiptCtrl.getReceipts = async (req, res) => {
  try {
    const receipts = await ClosedReceipt.find();
    res.json(receipts);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
}

closedReceiptCtrl.closeReceipt = async (req, res) => {
  try{
    const {receipt, clientName, total, paymentMethod, payed, change, status, productionDate} = req.body;
    const newClosedReceipt = new ClosedReceipt({receipt, clientName, total, paymentMethod, payed, change, status, productionDate});
    await newClosedReceipt.save();
    res.json('Receipt closed succesfully!');
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
};

closedReceiptCtrl.getReceiptsByProductionDate = async(req, res) => {
  try{
    var date = await Feature.findOne();
    date = date.productionDate
    var receipts = await ClosedReceipt.find({productionDate: date})
    res.json(receipts);
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
}

closedReceiptCtrl.getReceiptData = async (req, res) => {
  try{
    const {receipt} = req.params
    var receiptData = await ClosedReceipt.findOne({receipt});
    res.json(receiptData);
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
} 

closedReceiptCtrl.updateReceiptStatus = async(req, res) => {
  try{
    const {receipt} = req.params;
    const {status} = req.body;
    await ClosedReceipt.findOneAndUpdate({receipt},{
      status: status
    })
    res.json('Receipt updated successfully')
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
}

module.exports = closedReceiptCtrl;