import { BaseCommandInteraction, Client, GuildMember } from "discord.js";
import BotConfig from "../botConfig";
import WeatherConfig from "../weatherConfig";
import { Command } from "../command";

export const UpdateWeather: Command = {
  name: "weather",
  description: "Manually rolls the weather for the current season",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    const guildId = interaction.guildId ?? "";

    if (interaction.guild?.me?.permissions.has("MANAGE_CHANNELS")) {
      await updateWeather(client, guildId);
      await interaction.followUp({
        ephemeral: true,
        content: "Weather manually updated",
      });
      return;
    }
    interaction.followUp({
      ephemeral: true,
      content: "Insufficient permissions to update weather",
    });
  },
};

export async function updateWeather(
  client: Client,
  guildId: string
): Promise<boolean> {
  const theGuild = client.guilds.cache.get(guildId);
  if (!theGuild) {
    console.error(`Couldn't get reference to guild ${guildId}`);
    return false;
  }

  const config = BotConfig.getInstance().config.get(guildId);
  const season = config?.currentSeason ?? "";
  const channelId = config?.channelId ?? "";

  if (season.length === 0 || channelId.length === 0) {
    console.error("Couldn't update weather, no channel or season data found");
    return false;
  }

  const member = theGuild.me as GuildMember;
  const channelPerms = theGuild.channels.cache.
        get(channelId)?.permissionsFor(member, false);

  // if (theGuild?.me?.permissions.has("MANAGE_CHANNELS")) {
  //   const weather = WeatherConfig.getInstance().config.get(season);
  //   const roll = 1 + Math.floor(Math.random() * 100);

  //   const toBe = weather?.find((w) => roll <= w.cutoff)?.weather;

  //   const channel = theGuild?.channels.cache.get(channelId);
  //   if (channel) {
  //     await channel.setName(`Weather: ${toBe}`);
  //   }
  //   return true;
  // }
  return false;
}
