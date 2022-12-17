const axios = require("axios")
const chalk = require("chalk")
const { SLEEP } = require("../configs/config")


async function login(login, password, index) {
    const data = JSON.stringify({
        "email": login,
        "password": password
    })

    var config = {
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
    console.log(response.data)

    console.log(chalk.green("=========================="))
    console.log(chalk.green("=========================="))

    await sleep(SLEEP)
}

async function get_profile_data(){
    var config = {
        method: 'get',
        url: 'https://wa.overline.network/v1/account/profile',
        headers: { 
          'authority': 'wa.overline.network', 
          'accept': 'application/json, text/plain, */*', 
          'accept-language': 'en-US,en;q=0.9', 
          'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZWU2MzU2OC05M2NmLTRjNGMtYTM2MC02ZDA3ZTA3MmQyNzIiLCJpYXQiOjE2Njk1Njg2OTMsImV4cCI6MTY2OTU2ODk5M30.YoEuU-6A_nAfBWSgIh3e87kezoLZXaeyFEKQ4oyRjn1daJa65WgwSxyDtzX1UxAA2zD9bpvSXQ4GU8IvlBLaEHkYAnVQSxjROoY4f2BRDgpmP0a5HrfPPGfPrxUOd4rTtKQkGOnL-Oxb7GBnOkw8mL5cb9A9bTRWbKQrQz37Yby8VdlCuHfzvu68KTdfjL2D2IkE2CyXEjlphYI-IqC2tNQNexRImqVNJy0MHvGZxx1cCxmyaUZhXCrXCJluSEcph1ohR3lURmKTatN3U6iDghp1MHWPd9OI8CgZVDsM815C0XglL94Slwb9CtSq6RwHXnRCl4H2FCVTM44jhe0tjjLhKRgycKI_9rmItdye-ny--dkQK8DJZwNcgx4xwAtcP4Z1t4YqiyPOuoG-zWHGbbcsnnB2eoCgWX2tHvMUDDBG4M2ua6cLRCMU8ZVBn1XIUDLCgpbQUOEbEYb1rGzib4O9hdpvMIU2F8TbOiT63_tkMxrzgli9ap5yCsbBrcdYqvIYgbgvsy-GVezzUIV7Myvygc3A_PcxpSHepJpRT1C2RBZDt5ZlqtzW70oTPB0FEs1m7_tA8CLNY438wY9MedeSBy_JDoRsR6Sqoto2f5MbOluZhmBHsump_0Ot9c6UrLDnVCTzTQdVjaTSsWCX9IYPcvz0kAnP4nzmG2z5Y4U', 
          'origin': 'https://overline.network', 
          'referer': 'https://overline.network/', 
          'sec-ch-ua': '"Microsoft Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"Windows"', 
          'sec-fetch-dest': 'empty', 
          'sec-fetch-mode': 'cors', 
          'sec-fetch-site': 'same-site', 
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.56'
        }
      };
      
      axios(config)
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

module.exports = {
    login
}