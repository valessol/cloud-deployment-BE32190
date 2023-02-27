import dotenv from "dotenv";
dotenv.config();

const SQLITE3_CLIENT = process.env.SQLITE3_CLIENT;
const SQLITE3_FILENAME = process.env.SQLITE3_FILENAME;

export const options = {
  client: SQLITE3_CLIENT,
  connection: {
    filename: SQLITE3_FILENAME,
  },
};
