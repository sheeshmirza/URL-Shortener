const { createClient } = require("redis");

const CONFIG = require("../../config");
const utils = require("../../utils/utils");

const redisClient = createClient({
  url: `redis://${CONFIG.REDIS_HOST}:${CONFIG.REDIS_PORT}`,
  disableOfflineQueue: true,
});

const SET_CACHE = async (key, value, expirySeconds = 120) => {
  return redisClient
    .set(key, value, {
      EX: expirySeconds,
      NX: true,
    })
    .catch(async (error) => {
      utils.logger.error("redis-cache-set", error.message);
    });
};

const GET_CACHE = async (key) => {
  return redisClient
    .get(key)
    .catch(async (error) => {
      utils.logger.error("redis-cache-get", error.message);
    });
};

module.exports = {
  redisClient,
  SET_CACHE,
  GET_CACHE,
};