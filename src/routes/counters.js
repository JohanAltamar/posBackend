const {Router} = require('express');
const router = Router();

const {getCounters, updateCounters} = require('../controllers/counters.controller');

router.route('/')
  .get(getCounters)
  .put(updateCounters);

module.exports = router;