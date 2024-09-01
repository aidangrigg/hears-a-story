const { Router } = require("express");
const handler = require("./example.handler");

const router = Router();

router.get('/', handler.getExample);

module.exports = router;
