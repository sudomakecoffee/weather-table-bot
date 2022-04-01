import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import guildCreate from "./listeners/guildCreate";
import BotConfig from "./botConfig";
import { updateWeather } from "./commands/weather";

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

let waitForIt: NodeJS.Timeout;
async function setupTimer() {
  let runTime = new Date();
  runTime.setMinutes(runTime.getMinutes() + 1);
  //runTime.setDate(runTime.getDate() + 1);
  let timeLeft = runTime.getTime() - new Date().getTime();
  
  waitForIt = setTimeout(async function tick() {
    console.log("tick");
    runTime.setDate(runTime.getDate() + 1);
    console.table(BotConfig.getInstance().config.keys());
    for (let key of BotConfig.getInstance().config.keys()) {
      console.log("running key " + key); 
      updateWeather(client, key);
    }
    timeLeft = runTime.getTime() - new Date().getTime();
    console.log(`next run at ${ timeLeft / 1000 / 60 } minutes`);
    waitForIt = setTimeout(tick, timeLeft);
  }, timeLeft);
}

async function logout() {
  console.log("process exit detected, killing client connection");
  if (client.user && client.application) {
    if (waitForIt) {
      clearTimeout(waitForIt);
    }
    await client.application.commands.set([]);
    client.destroy();
  }
}

ready(client);
interactionCreate(client);
guildCreate(client);

process.on("SIGINT", logout);

client.login(process.env.TOKEN);
setupTimer();
