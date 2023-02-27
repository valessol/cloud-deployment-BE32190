import winston from "winston";
import { deploy } from "./helpers/cli.js";

function buildDefaultLogger() {
  return winston.createLogger({
    transports: [new winston.transports.Console({ level: "info" })],
  });
}

function buildProdLogger() {
  return winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: "./logs/warn.log",
        level: "warn",
      }),
      new winston.transports.File({
        filename: "./logs/error.log",
        level: "error",
      }),
    ],
  });
}

let logger = buildDefaultLogger();
if (process.env.NODE_ENV === "prod" || deploy === "prod")
  logger = buildProdLogger();
export default logger;
