const dotenv = require("dotenv");
const dotenvConfig = dotenv.config();

const CONFIG = {
  /* */
  PROTOCOL: process.env.SERVER_PROTOCOL,
  HOST: process.env.SERVER_HOST,
  PORT: process.env.SERVER_PORT,
  DOMAIN: process.env.DOMAIN,
  /* */
  DB_USER: process.env.MONGODB_ROOT_USER,
  DB_PASS: process.env.MONGODB_ROOT_PASS,
  DB_HOST: process.env.MONGODB_HOST,
  DB_PORT: process.env.MONGODB_PORT,
  DB_NAME: process.env.MONGODB_DB_NAME,
  /* */
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

module.exports = CONFIG;