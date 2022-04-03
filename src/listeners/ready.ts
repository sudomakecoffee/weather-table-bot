import { Client } from "discord.js";
import BotConfig from "../config/botConfig";
import { Commands } from "../commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    // Unregister any global slash commands
    // client.application?.commands.set([]);

    const config = BotConfig.getInstance().config;
    if (config.size > 0) {
      for (let guildId of config.keys()) {
        const guild = client.guilds.cache.get(guildId);
        for (let command of Commands) {
          if (!guild?.commands.cache.has(command.name)) {
            await guild?.commands.create(command);
          }
        }
        // await client.application?.commands.set(Commands, guildId);
      }
    }

    console.log(`${client.user.username} online ... All systems nominal`);
  });
};
