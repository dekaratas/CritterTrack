const router = require("express").Router();
const {
  getAllRecords,
  addNewRecord,
  deleteRecord,
} = require("./controllers/sightcontroller.js");
const { createOccurrences, deleteOccurrence } = require("./controllers/occurrencecontroller.js");

router.get("/sights", getAllRecords);
router.post("/addsight", addNewRecord);
router.delete("/sights/:id", deleteRecord);
router.post("/addapisights", createOccurrences);
router.delete("/apisights/:id", deleteOccurrence);

module.exports = router;
