const bot = require("./bot");
const interval = 1000 * 60 * 5;
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
setInterval(bot.sendPeriodicMessage, interval);
