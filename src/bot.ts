import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.login(process.env.TOKEN);
