const { LOGIN, PASSWORD } = require("./src/configs/config")
const bot = require("./src/bots/bot")
const chalk = require("chalk")

async function START() {
    console.log(chalk.green(""))
    console.log(chalk.green("Overline-Kraken"))
    console.log(chalk.green(""))
    console.log(chalk.green("Start Work..."))

    for (let i = 0; i < LOGIN.length; i++) {
        try {
            await bot.login(LOGIN[i], PASSWORD[i], i + 1)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(chalk.green("END"))
}

START()