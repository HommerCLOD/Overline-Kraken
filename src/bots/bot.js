const axios = require("axios")
const chalk = require("chalk")
const TelegramBot = require('node-telegram-bot-api')

const { SLEEP, TOKEN, BOT_WL, LOGIN, PASSWORD } = require("../configs/config")

const bot = new TelegramBot(TOKEN, { polling: true });

async function bot_launch() {
    bot.on("polling_error", console.log);

    bot.onText(/\/oKraken/, async (msg, match) => {
        if (msg.chat.id !== BOT_WL) return

        for (let i = 0; i < LOGIN.length; i++) {
            try {
                const data = await login(LOGIN[i], PASSWORD[i], i + 1)

                await sleep(SLEEP)

                await get_profile_data(data.data.accessToken)

                await sleep(SLEEP)
            } catch (error) {
                console.log(error)
            }
        }
    });
}

async function login(login, password, index) {
    const data = JSON.stringify({
        "email": login,
        "password": password
    })

    const config = {
        method: 'post',
        url: 'https://wa.overline.network/v1/account/sign-in',
        headers: {
            'authority': 'wa.overline.network',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'application/json',
            'content-type': 'application/json',
            'origin': 'https://overline.network',
            'referer': 'https://overline.network/',
            'sec-ch-ua': '"Microsoft Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.56'
        },
        data: data
    }

    const response = await axios(config)

    console.log(chalk.green("|-------------------"))
    console.log(chalk.green("| Profile: " + login))
    console.log(chalk.green("| Status: " + response.data.status))
    console.log(chalk.green("| Claimed: " + response.data.data.amountClaimed))
    console.log(chalk.green("|-------------------"))

    bot.sendMessage(BOT_WL, `| Profile: ${login}\n| Status: ${response.data.status}\n| Claimed: ${response.data.data.amountClaimed}`)

    return response.data
}

async function get_profile_data(Access_token) {
    const config = {
        method: 'get',
        url: 'https://wa.overline.network/v1/account/profile',
        headers: {
            'accept': "application/json, text/plain, */*",
            'accept-language': "en-US,en;q=0.9",
            'authorization': "Bearer " + Access_token,
            'Accept-Encoding': "gzip,deflate,compress",
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Microsoft Edge";v="108"',
            'sec-ch-ua-mobile': "?0",
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'Referer': "https://overline.network/",
            'Referrer-Policy': "strict-origin-when-cross-origin"
        },
    }
    const response = await axios(config)

    console.log(chalk.green("|-------------------"))
    console.log(chalk.green("| Profile: " + response.data.data.email))
    console.log(chalk.green("| Status: " + response.data.status))
    console.log(chalk.green("| oChashAmount: " + response.data.data.oCashAmount))
    console.log(chalk.green("| DAO Ranking: " + response.data.data.daoRanking))
    console.log(chalk.green("| Daily oCashStatus: " + response.data.data.dailyOCashStatus.amountAvailable))
    console.log(chalk.green("| Daily oCashStatus: " + response.data.data.dailyOCashStatus.lastClaim))
    console.log(chalk.green("|-------------------"))

    bot.sendMessage(BOT_WL, `| Profile: ${response.data.data.email}\n| Status: ${response.data.status}\n| oChashAmount: ${response.data.data.oCashAmount}\n| DAO Ranking: ${response.data.data.daoRanking}\n| Daily oCashStatus: ${response.data.data.dailyOCashStatus.amountAvailable}\n| Daily oCashStatus: ${response.data.data.dailyOCashStatus.lastClaim}`)
    return response.data
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

module.exports = {
    login,
    get_profile_data,
    sleep,
    bot_launch
}