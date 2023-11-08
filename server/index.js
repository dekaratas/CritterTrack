const express = require('express');
const cors = require('cors');
const router = require('./router.js');


const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🐳 Server running on http://localhost:${PORT} 🐳`);
})