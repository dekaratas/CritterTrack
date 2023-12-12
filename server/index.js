const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const apiConsoomer = require("./controllers/apiController.js");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

// apiConsoomer();

app.listen(PORT, () => {
  console.log(`🐳 Server running on http://localhost:${PORT} 🐳`);
});
