import { Client } from "discord.js";
import { Commands } from "../commands";
import BotConfig from "../config/botConfig";

export default (client: Client): void => {
  /**
   * Fires whenever the bot joins a guild (server).
   */
  client.on("guildCreate", async function (guild) {
    // when we join for the first time, create our commands
    const config = BotConfig.getInstance().config;
    if (!config.has(guild.id)) {
      guild.commands.set(Commands);

      config.set(guild.id, {
        channelId: "",
        currentSeason: "spring",
      });
      BotConfig.getInstance().save(config);
    }
  });
};
