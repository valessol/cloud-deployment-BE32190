import dotenv from "dotenv";
import path from "path";
import { deploy } from "./helpers/cli.js";

const envFileName = `${
  process.env.NODE_ENV ? process.env.NODE_ENV : "development"
}.env`;

if (process.env.NODE_ENV === "development" || deploy === "development")
  dotenv.config({
    path: path.resolve(process.cwd(), envFileName),
  });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
  MONGO_DATA_BASE_URL: process.env.MONGO_DATA_BASE_URL,
  SESSION_KEY: process.env.SESSION_KEY,
  PERSISTENCE: process.env.PERSISTENCE || "memory",
  EX_MODE: process.env.EX_MODE || "fork",
};
