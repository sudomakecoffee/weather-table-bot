import { BaseCommandInteraction, Client, GuildBasedChannel, GuildMember } from "discord.js";
import BotConfig from "../config/botConfig";
import WeatherConfig from "../config/weatherConfig";
import { Command } from "../command";
import { logger as parentLogger } from "../logger";

const log = parentLogger.child({ module: "commandWeather" });
export const UpdateWeather: Command = {
  name: "weather",
  description: "Manually rolls the weather for the current season",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const guildId = interaction.guildId ?? "";

    if (interaction.guild?.me?.permissions.has("MANAGE_CHANNELS")) {
      await updateWeather(client, guildId).catch((reason) => {
        log.error(`couldn't update channel name: ${reason}`);
        interaction.followUp("Error occurred, couldn't update channel name");
        return;
      });
      await interaction.followUp({
        ephemeral: true,
        content: "Weather manually updated",
      });
      return;
    }
    log.error(`failed due to likely insufficient permissions`);
    interaction.followUp({
      ephemeral: true,
      content: "Insufficient permissions to update weather",
    });
  },
};

export async function updateWeather(client: Client, guildId: string): Promise<boolean> {
  const theGuild = client.guilds.cache.get(guildId);
  if (!theGuild) {
    log.error(`Couldn't get reference to guild ${guildId}`);
    return false;
  }

  const config = BotConfig.getInstance().config.get(guildId);
  const season = config?.currentSeason ?? "";
  const channelId = config?.channelId ?? "";

  if (season.length === 0 || channelId.length === 0) {
    log.error("Couldn't update weather, no channel or season data found");
    return false;
  }

  if (theGuild?.me?.permissions.has("MANAGE_CHANNELS")) {
    const weather = WeatherConfig.getInstance().config.get(season);
    const roll = 1 + Math.floor(Math.random() * 100);

    const toBe = weather?.find((w) => roll <= w.cutoff)?.weather;

    log.info(`updating weather for ${guildId} to ${toBe}`);
    const channel = theGuild?.channels.cache.get(channelId) as GuildBasedChannel;
    await channel.setName(`Weather: ${toBe}`);
    return true;
  }
  return false;
}
