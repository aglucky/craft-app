import { CraftResponse, CraftResponseType } from "types";
import { Doc } from "../convex/_generated/dataModel";
import { z } from "zod";

export async function fetchCraft(first: Doc<"items">, second: Doc<"items">): Promise<CraftResponseType> {
  // Add delay of .2 sec
  await new Promise(resolve => setTimeout(resolve, 500));

  return fetch(`https://neal.fun/api/infinite-craft/pair?first=${first.name}&second=${second.name}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Microsoft Edge\";v=\"122\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookxie": "__cf_bm=9f1cey4qFcBYYfZNisINIW.Y8RSw5G5iZhR8HsgltMA-1709158604-1.0-AVAoVPmpfxk5+XKk6yLZvuAH4XaTWY6n0X8RqaRXEA3YqC4wqhfzqJgX/9bnQimTP+rc1c+YM3uSgRVN5h12nqE=; cf_clearance=mrwtsDMdRfuCfSY8AjbK6VAn1wI.qE_YJh7GMSlhiGw-1709158946-1.0-AbZHf7qqc7j3HmJ8ly2a0hayqbvGqSkxU9Yo3+bRrqpJnXOiTmdaXOZ6g24/vH4pAeGM6/ciMo7bhpVooTfHo3I=",
      "Referer": "https://neal.fun/infinite-craft/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    return CraftResponse.parse(data)
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    return null;
  });
}