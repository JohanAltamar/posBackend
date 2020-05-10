/** This route is intended to deal with customers affairs */

const {Router} = require('express');
const router = Router();

const {getCustomers, disableCustomer, createCustomer, getCustomersStartingWith, getCustomerById, updateCustomerById} = require('../controllers/customers.controller');

router.route('/')
  .get(getCustomers)
  .post(createCustomer)

router.route('/regex').get(getCustomersStartingWith)

router.route('/:id').get(getCustomerById).put(updateCustomerById)
  // .put(updateCustomer);
// router.route('/disable')
//   .get(disableCustomer)

module.exports = router;