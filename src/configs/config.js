require("dotenv").config()

module.exports = {
  LOGIN: process.env.LOGIN.split(","),
  PASSWORD: process.env.PASSWORD.split(","),
  SLEEP: +process.env.SLEEP,
  TOKEN: process.env.TOKEN,
  BOT_WL: +process.env.BOT_WL
}