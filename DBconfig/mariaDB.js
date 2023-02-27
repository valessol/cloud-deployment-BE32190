import dotenv from "dotenv";
dotenv.config();

const MARIA_DB_CLIENT = process.env.MARIA_DB_CLIENT;
const MARIA_DB_HOST = process.env.MARIA_DB_HOST;
const MARIA_DB_USER = process.env.MARIA_DB_USER;
const MARIA_DB_PASSWORD = process.env.MARIA_DB_PASSWORD;
const MARIA_DB_NAME = process.env.MARIA_DB_NAME;

export const options = {
  client: MARIA_DB_CLIENT,
  connection: {
    host: MARIA_DB_HOST,
    user: MARIA_DB_USER,
    password: MARIA_DB_PASSWORD,
    database: MARIA_DB_NAME,
  },
};
