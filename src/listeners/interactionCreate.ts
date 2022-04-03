import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";
import { logger as parentLogger } from "../logger";

const log = parentLogger.child({ module: "interactionCreate" });
export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: BaseCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    log.error(`interaction slash command ${interaction.commandName} not found`);
    interaction.followUp({ content: "An error has occurred" });
    return;
  }
  await interaction.deferReply();
  slashCommand.run(client, interaction);
};
