const router = require("express").Router();
const {
  getAllRecords,
  addNewRecord,
  deleteRecord,
} = require("./controllers/sightcontroller.js");

router.get("/sights", getAllRecords);
router.post("/addsight", addNewRecord);
router.delete("/sights", deleteRecord);

module.exports = router;
