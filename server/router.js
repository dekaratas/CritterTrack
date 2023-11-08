const router = require('express').Router();
const { getAllRecords, addNewRecord } = require('./controllers/sightcontroller.js')

router.get('/sights', getAllRecords);
router.post('/addsight', addNewRecord);

module.exports = router;