const operationModesCtrl = {};

const OperationModes = require('../models/OperationMode');

operationModesCtrl.getOperationMode = async(req, res) => {
  const {username} = req.query;
  if(username !== undefined){
    const operationMode = await OperationModes.find({username});
    res.json(operationMode);
  }
};
operationModesCtrl.operationModeForNewUser = async(req, res) =>{
  const {username, mode} = req.body;
  const newUserMode = new OperationModes({username, mode});
  await newUserMode.save();
  res.json('New mode added succesfully!');
};
operationModesCtrl.updateOperationMode = async(req, res) =>{
  const {username, mode} = req.body;
  await OperationModes.findOneAndUpdate({username}, {mode});
  res.json('Operation Mode updated succesfully!');
}
operationModesCtrl.deleteOperationMode =  async(req, res) => {
  const {username} = req.query; 
  if(username !== undefined){
    await OperationModes.findOneAndDelete({username});
    res.json('Operation Mode deleted succesfully! ')
  }
}

module.exports = operationModesCtrl;