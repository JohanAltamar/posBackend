const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

userCtrl.createUser = async (req, res) => {
  try {
    const { username, name, id, address, cellphone, whatsapp, email, status, password, role, createdBy } = req.body;

    const newUser = new User({ username, name, id, address, cellphone, whatsapp, email, status, password, role, createdBy });
    await newUser.save();
    res.json('User created');

  } catch (e) {
    console.log(e)
    res.json(e.errmsg);
  }
};

userCtrl.getUserById = async(req, res)=> {
  try {
    const {_id} = req.params;
    const user = await User.findById({_id});
    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
}
userCtrl.updateUser = async (req, res) => {
  try {
    const { username, name, id, address, cellphone, whatsapp, email, status, password, role } = req.body;
    const { _id } = req.params;

    await User.findByIdAndUpdate({ _id }, {
      username,
      name,
      id, address, cellphone, whatsapp, email, status,
      password, 
      role
    });
    res.json('User updated successfully.');

  } catch (e) {
    console.log(e)
    res.json(e.errmsg);
  }
};

userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json('User deleted');
};

userCtrl.loginUser = async(req, res) =>{
  try{
    const {username, password} = req.body;
    console.log(username, password);
    const user = await User.findOne({username, password});
    console.log(`${username} is authenticated.`)
    res.json(user);
  }
  catch(e){
    console.log(e);
    res.json(e.errmsg);
  }
};

userCtrl.getUsersStartedWith = async(req, res) => {
  try {
    const {input, option} = req.query;
    const users = await User.find({[option]:{$regex: "^" + input, $options: "i"}})
    res.json(users);
  } catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
}

module.exports = userCtrl;