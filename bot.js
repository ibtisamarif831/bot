const axios = require("axios");
const { load } = require("cheerio");
const Slimbot = require("slimbot");

const bot = new Slimbot("6394316552:AAF9epm1nJxMwkrriJJQ-X30B7Ejs0pzV6o");
const groupChatId = "-986446582";
const httpClient = axios.create();
httpClient.defaults.timeout = 30000;
async function sendPeriodicMessage() {
  console.log("Job Started");
  try {
    const html = await httpClient.get(
      "https://service2.diplo.de/rktermin/extern/appointment_showForm.do?locationCode=isla&realmId=108&categoryId=1600",
      {
        headers: {
          // Add any necessary headers (e.g., user-agent)
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
        },
      }
    );
    console.log(html.data);
    const $ = load(html.data);
    $(`#appointment_newAppointmentForm_fields_3__content`)
      .children("option")
      .each((_, elem) => {
        if (elem.attribs["value"].toString().includes("2024")) {
          const option = elem.attribs["value"].split("/");
          bot.sendMessage(
            groupChatId,
            "----------------------------------------------------"
          );
          bot.sendMessage(
            groupChatId,
            `Appointment found Keyword:2024 ${option[1]}`
          );
          bot.sendMessage(
            groupChatId,
            "----------------------------------------------------"
          );
        }
      });
    bot.sendMessage(
      groupChatId,
      `[Info] - ${JSON.stringify(new Date())} - Successfully scrapped!`
    );
  } catch (error) {
    bot.sendMessage(groupChatId, `[Error] - ${JSON.stringify(error.message)}`);
  }
  console.log("Job Ended");
}

module.exports = { sendPeriodicMessage };
