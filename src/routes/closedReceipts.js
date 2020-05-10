const { Router } = require('express');
const router = Router();

const {getReceipts, closeReceipt, getReceiptsByProductionDate, getReceiptData, updateReceiptStatus} = require('../controllers/closedReceipts.controller');

router.route('/').get(getReceipts).post(closeReceipt);
router.route('/productionDate').get(getReceiptsByProductionDate)
router.route('/:receipt').get(getReceiptData).put(updateReceiptStatus)

module.exports = router;