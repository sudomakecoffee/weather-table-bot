import { Client } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    console.log(`registering ${Commands.length} commands:`);
    Commands.forEach((command) => {
      console.log(`\t${command.name}`);
    });
    await client.application.commands.set(Commands);

    console.log(`${client.user.username} online ... All systems nominal`);
  });
};
