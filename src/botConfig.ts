import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { BotConfigData } from "./botConfigData";

export default class BotConfig {
  private static instance: BotConfig;
  private configName: string;
  private currentConfig: Map<string, BotConfigData>;

  private constructor(file: string) {
    this.configName = file;
    this.currentConfig = this.load();
  }

  static getInstance(): BotConfig {
    if (!BotConfig.instance) {
      const file = "botConf.json";
      BotConfig.instance = new BotConfig(file);
    }
    return BotConfig.instance;
  }

  public get config() {
    if (!this.currentConfig) {
      this.currentConfig = BotConfig.getInstance().load();
    }
    return this.currentConfig;
  }

  public load(): Map<string, BotConfigData> {
    let config = new Map<string, BotConfigData>();

    try {
      const file = join(__dirname, this.configName);
      const data = readFileSync(file, { encoding: "utf8" });
      const json = JSON.parse(data);
      for (let key in json) {
        config.set(key, json[key]);
      }
    } catch (e) {
      console.warn("No config data found, loading defaults");
    }

    return config;
  }

  public save(config: Map<string, BotConfigData> = this.config): void {
    try {
      const file = join(__dirname, this.configName);
      const objectified = Object.fromEntries(config);

      writeFileSync(file, JSON.stringify(objectified), { encoding: "utf8" });
    } catch (e) {
      console.error("Couldn't write config!");
    }
  }
}
