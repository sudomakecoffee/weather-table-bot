import { BaseCommandInteraction, Client } from "discord.js";
import BotConfig from "../config/botConfig";
import { BotConfigData } from "../config/botConfigData";
import { Command } from "../command";

export const Season: Command = {
  name: "season",
  description: "Sets the current season",
  type: "CHAT_INPUT",
  options: [
    {
      name: "season",
      description: "Sets the current season",
      type: "STRING",
      choices: [
        { name: "Spring", value: "spring" },
        { name: "Summer", value: "summer" },
        { name: "Autumn", value: "autumn" },
        { name: "Winter", value: "winter" },
      ],
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const choice = interaction.options.get("season")?.value ?? "unknown";
    const content = `Season has been updated to ${choice}`;

    const guildId = interaction.guildId as string;
    const config = BotConfig.getInstance().config;
    const guildConfig = config.get(guildId) as BotConfigData;

    guildConfig.currentSeason = choice as string;
    config.set(guildId, guildConfig);

    BotConfig.getInstance().save(config);

    await interaction.followUp({ ephemeral: true, content });
  },
};
