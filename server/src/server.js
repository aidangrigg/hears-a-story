const express = require('express');
require('dotenv').config();

const app = express();

// Middleware
const auth = require('./middleware/auth');
app.use(auth);

// Routing
const routes = require('./routes');
app.use(routes);

// Start the server
const PORT = process.env.PORT | 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  
  console.log(`Example app listening on port ${PORT}`);
});
