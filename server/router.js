const router = require("express").Router();
const {
  getAllRecords,
  addNewRecord,
  deleteRecord,
} = require("./controllers/sightcontroller.js");
const {
  getOccCount,
  getSpeciesCount,
} = require("./controllers/occurrencecontroller.js");

router.get("/sights", getAllRecords);
router.post("/addsight", addNewRecord);
router.delete("/sights/:id", deleteRecord);
router.get("/occs", getOccCount);
router.get("/speccs", getSpeciesCount);

module.exports = router;
