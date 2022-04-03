import { pino } from "pino";
import dotenv from "dotenv";

dotenv.config();
const transport = pino.transport({
  target: "pino/file",
  options: { destination: "weatherbot.log" },
});
export const logger = pino({ level: process.env.LOG_LEVEL || "info" }, transport);
