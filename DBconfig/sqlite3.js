import dotenv from "dotenv";
import { deploy } from "../helpers/cli.js";
if (process.env.NODE_ENV === "dev" || deploy === "dev") dotenv.config();

const SQLITE3_CLIENT = process.env.SQLITE3_CLIENT;
const SQLITE3_FILENAME = process.env.SQLITE3_FILENAME;

export const options = {
  client: SQLITE3_CLIENT,
  connection: {
    filename: SQLITE3_FILENAME,
  },
};
