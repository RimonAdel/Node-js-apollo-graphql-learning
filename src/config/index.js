import { config } from "dotenv";
const { parsed } = config();

export const {
  PORT,
  MODE,
  SECRET,
  DB,
  BASE_URL,
  URL = `${BASE_URL}${PORT}`,
} = parsed;
