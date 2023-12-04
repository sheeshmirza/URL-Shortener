const express = require("express");
const mongoose = require("mongoose");
const redis = require("../src/services/cache/cacheClient");

const CONFIG = require("./config");
const utils = require("./utils/utils");

const requestErrorHandler = require("./middlewares/common/requestErrorHandler");
const requestLogger = require("./middlewares/common/requestLogger");
const router = require("./routes/router");

const app = express();
app.use(express.json());
app.use(requestErrorHandler);
app.use(requestLogger);
app.use("/", router);

app.listen(CONFIG.PORT, async () => {
  utils.logger.log(
    "server-listener",
    `server started at ${CONFIG.PROTOCOL}://${CONFIG.HOST}:${CONFIG.PORT}`
  );
});

mongoose
  .connect(
    `mongodb://${CONFIG.DB_USER}:${CONFIG.DB_PASS}@${CONFIG.DB_HOST}:${CONFIG.DB_PORT}/`,
    {
      dbName: CONFIG.DB_NAME,
    }
  )
  .then(async () => {
    utils.logger.log("database-connection", "database connected");
  })
  .catch(async (error) => {
    utils.logger.error("database-connection", error.message);
  });

redis.redisClient
  .connect()
  .then(async () => {
    utils.logger.log("redis-connection", "redis connected");
  })
  .catch(async (error) => {
    utils.logger.error("redis-connection", error.message);
  });