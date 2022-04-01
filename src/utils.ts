import * as fs from "fs";

let configData: Map<string, BotConfiguration> = new Map<
  string,
  BotConfiguration
>();

export const getConfig = () => {
  if (!configData) {
    configData = loadConfig();
  }
  return configData;
};

export const loadConfig = (): Map<string, BotConfiguration> => {
  const configPath = "src/bot-config.json";
  let config;

  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch (e) {
    console.warn("No save data found, loading defaults");
    config = {};
  }
  return config;
};

export const saveConfig = (config: Map<string, BotConfiguration>): void => {
  const configPath = "src/bot-config.json";
  try {
    fs.writeFileSync(configPath, JSON.stringify(config));
  } catch (e) {
    console.warn("Couldn't write config");
  }
};

export interface BotConfiguration {
  channelId: string;
  currentSeason: string;
}
