const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const lookup = require("coordinate_to_country");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

console.log(lookup(77.01597, 15.90404));

app.listen(PORT, () => {
  console.log(`🐳 Server running on http://localhost:${PORT} 🐳`);
});
