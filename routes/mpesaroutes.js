const express = require("express");
const router = express.Router();
const { stkPush, callback } = require("../controllers/mpesaController");

router.post("/stkpush", stkPush);
router.post("/callback", callback);

module.exports = router;
