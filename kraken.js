const bot = require("./src/bots/bot")
const chalk = require("chalk")

async function START() {
    console.log(chalk.red("\n\n| - = [ Overline-Kraken ] = - \n\n"))

    await bot.bot_launch()
}

START()