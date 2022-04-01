/**
 * Fires whenever the bot joins a guild (server).
 */
import { Client } from "discord.js";
import { getConfig } from "../utils";

export default (client: Client): void => {
  client.on("guildCreate", function (guild) {
    let config = getConfig();
  });
};
