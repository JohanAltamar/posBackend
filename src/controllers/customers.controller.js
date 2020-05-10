const customerCtrl = {};

const Customer = require('../models/Customer');

customerCtrl.getCustomers = async(req, res) =>{
  try{
    const customers = await Customer.find();
    res.json(customers);
  }
  catch(e){
    res.status(400).json({
      error: err
    });
  }
};

customerCtrl.createCustomer = async (req, res) => {
  try {
    const { name, id, address, telephone, whatsapp, email, creditAvailable, creditAmount, creditDeadlines, creditBalance } = req.body;

    const newCustomer = new Customer({ name, id, address, telephone, whatsapp, email, creditAvailable, creditAmount, creditDeadlines, creditBalance  });
    await newCustomer.save();
    res.json('Customer created');

  } catch (e) {
    console.log(e)
    res.json(e.errmsg);
  }
}

customerCtrl.getCustomerById = async(req, res) => {
  try{
    const _id = req.params.id;
    const customer = await Customer.findById({_id});
    res.json(customer);
  }
  catch(e){
    res.status(400).json({
      error: err
    });
  }
}

customerCtrl.updateCustomerById = async(req, res) => {
  try{
    const _id = req.params.id;
    const {name, id, address, telephone, whatsapp, email, 
      creditAmount, creditAvailable, creditDeadlines, 
      creditBalance, status} = req.body;
    await Customer.findByIdAndUpdate({_id},{
      name, id, address, telephone, whatsapp, email, 
      creditAmount, creditAvailable, creditDeadlines, 
      creditBalance, status
    });
    res.json("Customer updated successfully.");
  }
  catch(e){
    res.status(400).json({
      error: err
    });
  }
}

customerCtrl.getCustomersStartingWith = async(req, res) => {
  const {input, option} = req.query;
  try {
    const customer = await Customer.find({[option]:{$regex:"^" + input, $options: 'i'}})
    res.json(customer)
  } catch (e) {
    res.status(400).json({
      error: err
    });
  }
}

// customerCtrl.updatecustomers = async(req, res) =>{
//   const {name, id, address, telephone, whatsapp, email, creditAvailable, creditAmount, creditDeadlines, creditBalance, status} = req.body;
//   await Customer.findByIdAndUpdate(_id,{});
//   res.json('customers updated succesfully.')
// }

module.exports = customerCtrl;