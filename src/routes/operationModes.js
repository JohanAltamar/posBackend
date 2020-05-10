const {Router} = require('express');
const router = Router();

const {getOperationMode, operationModeForNewUser, updateOperationMode, deleteOperationMode} = require('../controllers/operationModes.controller');

router.route('/')
.get(getOperationMode)
.post(operationModeForNewUser)
.put(updateOperationMode)
.delete(deleteOperationMode)

module.exports = router; 