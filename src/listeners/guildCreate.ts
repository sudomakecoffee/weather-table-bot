/**
 * Fires whenever the bot joins a guild (server).
 */
import { Client } from "discord.js";
import { Commands } from "../commands";
import BotConfig from "../botConfig";

export default (client: Client): void => {
  console.log("registering listener for guildCreate");
  client.on("guildCreate", async function (guild) {
    // when we join for the first time, create our commands
    console.log(`Joined ${guild.name}`);

    const config = BotConfig.getInstance().config;
    if (!config.has(guild.id)) {
      console.log(`registering ${Commands.length} commands in ${guild.name}:`);
      Commands.forEach((command) => {
        console.log(`\t${command.name}`);
      });
      await client.application?.commands.set(Commands, guild.id);

      config.set(guild.id, {
        channelId: "",
        currentSeason: "spring",
      });
      BotConfig.getInstance().save(config);
    }

    // if (guild.me?.permissions.has("MANAGE_CHANNELS")) {
    //   const channelParent = guild.channels.cache.find(
    //     (channel) =>
    //       channel.name.toLowerCase().startsWith("stats") ||
    //       channel.name.toLowerCase() === "voice"
    //   );
    //   const channel = await guild.channels.create("Weather: ", {
    //     type: ChannelTypes.GUILD_VOICE,
    //     parent: channelParent?.id,
    //     permissionOverwrites: [
    //       {
    //         id: guild.roles.everyone,
    //         allow: ["VIEW_CHANNEL"],
    //         deny: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT"],
    //       },
    //     ],
    //   });
    // }
  });
};
