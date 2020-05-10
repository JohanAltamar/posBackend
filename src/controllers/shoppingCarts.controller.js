const shoppingCartCtrl = {};

const ShoppingCart = require('../models/ShoppingCart');

shoppingCartCtrl.getShoppingCart = async (req, res) => {
    try {
        const { username } = req.params;
        const shoppingCart = await ShoppingCart.findOne({ username });
        res.json(shoppingCart);
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
        res.send({ error: 'Bad request' })
    }
}

shoppingCartCtrl.add2ShoppingCart = async (req, res) => {
    try {
        const { username } = req.params
        const { products } = req.body;
        const shoppingCart = await ShoppingCart.find({ username });
        if(shoppingCart.length === 0){
            const newShoppingCart = new ShoppingCart({ products, username });
            await newShoppingCart.save();
        } else {
            await ShoppingCart.findOneAndUpdate({username},{
                products, username
            })
        }
        res.json('Products added succesfully.');
    }
    catch (e) {
        console.log(e);
        res.json(e.errmsg);
    }
};

shoppingCartCtrl.deleteLastItem = async (req, res) => {
    try {
        const { username } = req.params;
        const shoppingCart = await ShoppingCart.findOne({username});
        var products = shoppingCart.products;
        products.pop();
        await ShoppingCart.findOneAndUpdate({username}, {products, username})
        res.json(products.pop());
    } catch (error) {
        console.log(error);
        res.json(error.errmsg);
    }
}

shoppingCartCtrl.deleteItemByBarcode = async (req, res) => {
    try {
        const { username, barcode } = req.params;
        const shoppingCart = await ShoppingCart.findOne({username});
        var products = shoppingCart.products;
        for(let i = 0; i < products.length; i++){
            if(products[i].barcode === barcode){
                products.splice(i, 1);
                break;
            }
        }
        await ShoppingCart.findOneAndUpdate({username}, {products, username})
        res.json('Shopping cart updated successfully.')
    } catch (error) {
        console.log(error);
        res.json(error.errmsg)
    }
}

module.exports = shoppingCartCtrl;