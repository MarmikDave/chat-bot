const express = require("express");
const { askAI } = require("../controllers/chatController");
const router = express.Router();

router.post("/ask", askAI);

module.exports = router;
