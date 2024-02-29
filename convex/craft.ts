import { action } from "./_generated/server";
import { v } from "convex/values";

export const craft = action({
  args: {},
  handler: async (ctx, args) => {

    const res = await fetch("https://neal.fun/api/infinite-craft/pair?first=Mermaid&second=Whale", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Microsoft Edge\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "__cf_bm=9f1cey4qFcBYYfZNisINIW.Y8RSw5G5iZhR8HsgltMA-1709158604-1.0-AVAoVPmpfxk5+XKk6yLZvuAH4XaTWY6n0X8RqaRXEA3YqC4wqhfzqJgX/9bnQimTP+rc1c+YM3uSgRVN5h12nqE=; cf_clearance=mrwtsDMdRfuCfSY8AjbK6VAn1wI.qE_YJh7GMSlhiGw-1709158946-1.0-AbZHf7qqc7j3HmJ8ly2a0hayqbvGqSkxU9Yo3+bRrqpJnXOiTmdaXOZ6g24/vH4pAeGM6/ciMo7bhpVooTfHo3I=",
        "Referer": "https://neal.fun/infinite-craft/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    let data = {};
    console.log(res)
    if (res.ok) {
      data = await res.json();
    }
    return data;
  },
});