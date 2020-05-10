const counterCtrl = {};

const Counter = require('../models/Counter');

counterCtrl.getCounters = async(req, res) =>{
  try{
    const counters = await Counter.find();
    res.json(counters);
  }
  catch(e){
    res.status(400).json({
      error: err
    });
  }
};

counterCtrl.updateCounters = async(req, res) =>{
  const {operations, receipt, yesterday, today, last7days, last30days} = req.body;
  await Counter.findByIdAndUpdate("5dbee4816a0567084842c45b",{
    operations: operations,
    receipt: receipt, 
    yesterday:yesterday, 
    today: today, 
    last7days: last7days, 
    last30days: last30days
  });
  res.json('Counters updated succesfully.')
}

module.exports = counterCtrl;