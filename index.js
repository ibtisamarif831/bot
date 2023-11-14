const bot = require("./bot");
const interval = 1000 * 60 * 5;
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000, "0.0.0.0");

setInterval(bot.sendPeriodicMessage, interval);
