const { Router } = require("express");
const exampleRoute = require("./api/example");

const app = Router();

app.use('/api/example', exampleRoute);

module.exports = app;
