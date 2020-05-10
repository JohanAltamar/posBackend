const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());

// routes
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/operations', require('./routes/operations'));
app.use('/counters', require('./routes/counters'));
app.use('/closedReceipts', require('./routes/closedReceipts'));
app.use('/operationModes', require('./routes/operationModes'));
app.use('/features', require('./routes/paymentMethods')); //Has business features like: money, departments, cashierInfo
app.use('/customers', require('./routes/customers'));
app.use('/shoppingCart', require('./routes/shoppingCart'));
module.exports = app;