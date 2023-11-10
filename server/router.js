const router = require("express").Router();
const {
  getAllRecords,
  addNewRecord,
  deleteRecord,
} = require("./controllers/sightcontroller.js");
const { createOccurrences } = require("./controllers/occurrencecontroller.js");

router.get("/sights", getAllRecords);
router.post("/addsight", addNewRecord);
router.delete("/sights/:id", deleteRecord);
router.post("/addapisights", createOccurrences);

module.exports = router;
