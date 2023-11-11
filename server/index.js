const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const apiConsoomer = require("./controllers/apiController.js");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

// Given the "local desktop app" nature of this project there's overall not that much to see in the back.
// As of writing this, there's a Prisma Schema with two models. One that Users on the frontend populate and which will then serve as
// personal data storage for hobbyists, etc. The other one will be populated over the coming days through API calls to api.obis.org.
// The purpose being, having an incredibly large pool of information and data to call from enables me to construct the other half of this
// project as an accessible knowledgebase for data visualization and just overall information around marine biodiversity.

// Due to its small size and me still figuring out Prisma's capabilities, I've kinda shifted away from strict Model/Controller separation.
// Prisma handels the connection to postgres and I'm using one controller file per model so as to keep things somewhat modular and readable.
// Naming convention, I didn't really consider so sight = user entries, occurrence = API entries because their first basic endpoing is /occurrence

// Function to scrape API on a 2sec interval
// apiConsoomer();

app.listen(PORT, () => {
  console.log(`🐳 Server running on http://localhost:${PORT} 🐳`);
});
