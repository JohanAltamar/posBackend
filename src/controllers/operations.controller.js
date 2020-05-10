const operationCtrl = {};

const Operation = require('../models/Operation');

operationCtrl.getOperations = async (req, res)=> {
  try{
    const {receipt}= req.query;
    if(receipt === undefined){
      const operation = await Operation.find();
      res.json(operation);
    }else{
      const operation = await Operation.find({receipt: receipt});
      res.json(operation);
    }
  }
  catch(err){
    res.status(400).json({
      error: err
    });
    res.send({error: 'Bad request'})
  }
}

operationCtrl.createOperation = async(req, res) => {
  try{
    const {receipt, name, PLU, department, qty, price, barcode} = req.body;
    const newOperation = new Operation({receipt, name, PLU, department, qty, price, barcode});
    await newOperation.save();
    res.json('Operation added succesfully');
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
};

operationCtrl.updateOperation = async(req, res) => {
  const id = req.query.id; 
  await Operation.findOneAndUpdate({_id: id},{
    status: 'returned'
  })
  res.json('Item returned succesfully')
}

operationCtrl.deleteOperation = async(req,res) => {
  try{
    const id = req.query.id;
    await Operation.findOneAndDelete({_id:id});
    res.json('Operation deleted succesfully');
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg)
  }
}

module.exports = operationCtrl;