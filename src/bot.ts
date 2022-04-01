import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { loadConfig, saveConfig } from "./utils";
import { string } from "zod";

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

async function logout() {
  console.log("process exit detected, killing client connection");
  if (client.user && client.application) {
    await client.application.commands.set([]);
    client.destroy();
  }
}

let config = loadConfig();
console.log(config);
config.set("123", { channelId: "456", currentSeason: "spring" });
console.log(config);
saveConfig(config);

// async function login() {
//   const func = async () => {
//     client.login(process.env.TOKEN);
//   };
//   await func();
// }
// login();

// client.guilds.cache.forEach((guild) => {
//   guild.leave();
// });

// client.destroy();

// ready(client);
// interactionCreate(client);

// process.on("SIGINT", logout);
