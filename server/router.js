const router = require("express").Router();
const {
  getAllRecords,
  addNewRecord,
  deleteRecord,
} = require("./controllers/sightcontroller.js");
const {
  getOccCount,
  getSpeciesCount,
  getCountryCount,
  getCountryNames,
  getSpecies,
} = require("./controllers/occurrencecontroller.js");

router.get("/sights", getAllRecords);
router.post("/addsight", addNewRecord);
router.delete("/sights/:id", deleteRecord);
router.get("/occs", getOccCount);
router.get("/speccs", getSpeciesCount);
router.get("/countCount/:country", getCountryCount);
router.get("/countries", getCountryNames);
router.get("/species", getSpecies);

module.exports = router;
