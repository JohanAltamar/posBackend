const { Router } = require('express');
const router = Router();

const {getOperations, createOperation, deleteOperation, updateOperation} = require('../controllers/operations.controller');

router.route('/').get(getOperations).post(createOperation).put(updateOperation).delete(deleteOperation);

module.exports = router;