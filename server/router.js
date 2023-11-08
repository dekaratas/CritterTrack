const router = require('express').Router();
const { getAllRecords } = require('./controllers/sightcontroller.ts')

router.get('/sights', getAllRecords);

module.exports = router;