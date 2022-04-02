import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import guildCreate from "./listeners/guildCreate";
import BotConfig from "./config/botConfig";
import { updateWeather } from "./commands/weather";

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let waitForIt: NodeJS.Timeout;
async function setupTimer() {
  let runTime = new Date();

  runTime.setHours(8, 0, 0, 0);
  if (runTime < new Date()) {
    runTime.setDate(runTime.getDate() + 1);
    console.log("Today's timer has passed, aiming for tomorrow");
  }
  let timeLeft = runTime.getTime() - new Date().getTime();

  waitForIt = setTimeout(async function tick() {
    for (let key of BotConfig.getInstance().config.keys()) {
      updateWeather(client, key).catch((err) => {
        console.error(`Couldn't update ${key}, likely permissions issue`);
      });
    }
    runTime.setDate(runTime.getDate() + 1);
    timeLeft = runTime.getTime() - new Date().getTime();
    console.log("Tick done, next run time " + runTime.toString());
    waitForIt = setTimeout(tick, timeLeft);
  }, timeLeft);
}

async function logout() {
  console.log("process exit detected, killing client connection");
  if (client.user && client.application) {
    if (waitForIt) {
      clearTimeout(waitForIt);
    }

    client.destroy();
  }
}

ready(client);
interactionCreate(client);
guildCreate(client);

process.on("SIGINT", logout);

client.login(process.env.TOKEN);
setupTimer();
