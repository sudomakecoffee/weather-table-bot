import { Client } from "discord.js";
import BotConfig from "src/botConfig";
import { Commands } from "../commands";

export default (client: Client): void => {
  console.log("registering listener for ready");
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    // Unregister any global slash commands
    // client.application?.commands.set([]);

    const config = BotConfig.getInstance().config;
    if (config.size > 0) {
      console.log(`checking commands in existing servers`);
      Commands.forEach((command) => {
        console.log(`\t${command.name}`);
      });

      for (let guildId in config.keys()) {
        Commands.forEach(async (command) => {
          if (!client.application?.commands.cache.has(command.name)) {
            console.log(`\tregistering ${command.name} in ${guildId}`);
            await client.application?.commands.create(command, guildId);
          }
        });
        await client.application?.commands.set(Commands, guildId);
      }
    }

    console.log(`${client.user.username} online ... All systems nominal`);
  });
};
