import { BaseCommandInteraction, Client } from "discord.js";
import BotConfig from "../config/botConfig";
import { Command } from "../command";

export const SetChannel: Command = {
  name: "setchan",
  description: "Sets the channel the bot uses to note the weather",
  type: "CHAT_INPUT",
  options: [
    {
      name: "id",
      description: "Numeric channel ID",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const guildId = interaction.guildId ?? "";
    const channelId = interaction.options.get("id")?.value ?? "unknown";
    const config = BotConfig.getInstance().config.get(guildId) ?? {
      channelId: "",
      currentSeason: "",
    };

    config.channelId = channelId as string;
    BotConfig.getInstance().config.set(guildId, config);
    BotConfig.getInstance().save();

    interaction.followUp({
      ephemeral: true,
      content: `Channel set to ${channelId}`,
    });
  },
};
