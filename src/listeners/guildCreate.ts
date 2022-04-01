/**
 * Fires whenever the bot joins a guild (server).
 */
import { Client } from "discord.js";
import { ChannelTypes } from "discord.js/typings/enums";
import BotConfig from "../botConfig";

export default (client: Client): void => {
  console.log("registering listener for guildCreate");
  client.on("guildCreate", async function (guild) {
    // when we join for the first time, attempt to create a voice channel and get its ID
    console.log(`Joined ${guild.name}`);

    if (guild.me?.permissions.has("MANAGE_CHANNELS")) {
      const channelParent = guild.channels.cache.find(
        (channel) =>
          channel.name.toLowerCase().startsWith("stats") ||
          channel.name.toLowerCase() === "voice"
      );
      const channel = await guild.channels.create("Weather: ", {
        type: ChannelTypes.GUILD_VOICE,
        parent: channelParent?.id,
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            allow: ["VIEW_CHANNEL"],
            deny: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT"],
          },
        ],
      });
      const configuration = BotConfig.getInstance().config;
      configuration.set(guild.id, {
        channelId: channel.id,
        currentSeason: "spring",
      });
      BotConfig.getInstance().save(configuration);
    }
  });
};
