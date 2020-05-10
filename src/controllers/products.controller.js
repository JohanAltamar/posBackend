const productCtrl = {};
const Product = require('../models/Product');

//If number o string doesnt exist, length will be assigned 0.
const checkLength = (number) => {

  if (number === undefined) {
    // console.log("Es " + typeof(number));
    return 0;
  }
  else {
    // console.log("No es " + typeof(number));
    return number.length;
  }
}

//Fetch for all existing products
productCtrl.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  }
  catch (err) {
    res.status(400).json({
      error: err
    });
  }
};
//Add new products
productCtrl.createProduct = async (req, res) => {
  try {
    const { name, price, department, stock, PLU, barcode, isWeighted, cost, status } = req.body;
    const newProduct = new Product({ name, price, department, stock, PLU, barcode, isWeighted, cost, status });
    await newProduct.save();
    res.json('Product created.');
  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
};
//Fetch for only one product, using barcode (priority) and PLU code
productCtrl.getProduct = async (req, res) => {
  try {
    const PLU = req.query.plu;
    const barcode = req.query.barcode;
    var product = '';
    //barcode reading has priority over PLU code. 
    if (checkLength(barcode) === 12) {
      product = await Product.find({ barcode });
      // console.log(barcode);
    } else {
      product = await Product.find({ PLU });
      // console.log(PLU);
    }
    res.json(product);
  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
};
//To update and delete product, ID known. 
productCtrl.updateProduct = async (req, res) => {
  try {
    const { name, price, department, barcode, PLU, stock, isWeighted, cost, status } = req.body;
    const _id = req.params.id;

    await Product.findByIdAndUpdate({ _id }, { name, price, department, barcode, PLU, stock, isWeighted, cost, status });
    res.json('Product updated succesfully.');
  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
};
productCtrl.deleteProduct = async (req, res) => {
  const _id = req.params.id;
  await Product.findByIdAndDelete(_id);
  res.json('Product deleted succesfully.');
};

//Update Inventory after sell
productCtrl.updateInventory = async (req, res) => {
  try {
    const PLU = req.query.plu;
    const qty = req.body.qty;
    var product = '';
    var stock = 0;
    // console.log(PLU, typeof(PLU), qty, typeof(qty));

    product = await Product.find({ PLU });

    stock = product[0].stock + qty;
    await Product.findOneAndUpdate({ PLU }, { stock })
    res.json('Inventory updated successfully!');
  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
}
productCtrl.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product)
  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
}

productCtrl.getProductsStartedWith = async (req, res) => {
  try {
    const { input, option } = req.query;
    switch (option) {
      case ('name'):
        var product = await Product.find({ name: { $regex: "^" + input, $options: "i" } })
        res.json(product);
        break;
      case ('PLU'):
        product = await Product.find({ PLU: { $regex: "^" + input, $options: "i" } })
        res.json(product);
        break;
      case ('barcode'):
        product = await Product.find({ barcode: { $regex: "^" + input, $options: "i" } })
        res.json(product);
        break;
      default:
        break;
    }

  }
  catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
}

//Used to update stock prices of many items
productCtrl.updateStockPrices = async (req, res) => {
  try {
    const { department, mode, amount } = req.query;
    let response = {n: null, nModified: null};
    // console.log(department, mode, amount);
    // console.log(response.n, response.nModified);
    if (department === 'all') {
      if(mode === 'mul'){
        response = await Product.updateMany(
          { },
          { $mul: { price: amount } }
        )
      }else if(mode ==='inc'){
        response = await Product.updateMany(
          {},
          { $inc: { price: amount } }
        )
      }
    }
    else {
      if(mode === 'mul'){
        response = await Product.updateMany(
          {department},
          { $mul: { price: amount } }
        )
      }else if(mode ==='inc'){
        response = await Product.updateMany(
          {department},
          { $inc: { price: amount } }
        )
      }
    }
    // console.log(department, mode, amount);
    // console.log(response.n, response.nModified);
    res.json('Products updated successfully.');
  } catch (error) {
    res.json(error.errmsg)
    console.log(error.errmsg)
  }
}

module.exports = productCtrl;