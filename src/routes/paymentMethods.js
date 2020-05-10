const {Router} = require('express');
const router = Router();

const {getPaymentMethods, getTotals, updateTotals} = require('../controllers/paymentMethods.controller');

router.route('/methods').get(getPaymentMethods);
router.route('/updateCurrentCashier').get(getTotals).put(updateTotals);

module.exports = router;