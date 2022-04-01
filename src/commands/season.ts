import { BaseCommandInteraction, Client } from "discord.js";
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
    await interaction.followUp({ ephemeral: true, content });
  },
};

// {
//   type: 3,
//   name: "seasons",
//   choices: [
//     {
//       name: "Spring",
//       value: "spring",
//     },
//     {
//       name: "Summer",
//       value: "summer",
//     },
//   ],
// },

// let thing: ApplicationCommandOptionData = {
//   name: "season",
//   description: "Sets the current season",
//   type: "STRING",
//   choices: [
//     { name: "Spring", value: "season_spring" },
//     { name: "Summer", value: "season_summer" },
//     { name: "Autumn", value: "season_autumn" },
//     { name: "Winter", value: "season_winter" },
//   ],
// };
