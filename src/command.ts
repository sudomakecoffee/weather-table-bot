import {
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";

export interface Command extends BaseCommandInteraction {
  run: (client: Client, interaction: BaseCommandInteraction) => void;
}
