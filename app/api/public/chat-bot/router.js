const express = require("express");
const { chatbot } = require("./controller");
const router = express();

router.post("/chat-bot", chatbot);

module.exports = router;
