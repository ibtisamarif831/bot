const bot = require('./bot');
const interval = 1000 * 60 * 10

setInterval(bot.sendPeriodicMessage, interval);