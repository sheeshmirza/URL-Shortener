const urlModel = require("../../models/url/url.model");
const redis = require("../cache/cacheClient");
const utils = require("../../utils/utils");
const CONFIG = require("../../config");

const getLongUrl = async (shortCode) => {
  if (!shortCode) {
    throw new Error("shortCode must be provided");
  }
  /* try from cache */
  let longUrl = await redis.GET_CACHE(shortCode);
  if (longUrl) {
    utils.logger.log("url-service", `found in cache -> ${shortCode}`);
  }
  if (!longUrl) {
    /* to get current date and time */
    const currentDate = new Date();
    /* try from database */
    longUrl = await urlModel.findOne({
      shortCode: shortCode,
      expiredAt: {
        $gte: currentDate.getTime(),
      },
    });
    if (longUrl?.longUrl) {
      longUrl = longUrl.longUrl;
      utils.logger.log("url-service", `found in database -> ${shortCode}`);
    }
  }
  if (longUrl) {
    /* put in cache */
    redis.SET_CACHE(shortCode, longUrl, CONFIG.URL_CACHE_EXPIRY);
    /* update clickedCounts */
    getClicks(shortCode);
    /* respond with longUrl */
    utils.logger.log("url-service", `fetched -> ${shortCode}`);
    return {
      longUrl: longUrl,
    };
  } else {
    throw new Error("longUrl not found");
  }
};

const getClicks = async (shortCode) => {
  return urlModel.updateOne(
    {
      shortCode: shortCode,
    },
    {
      $inc: {
        clickedCounts: 1,
      },
    }
  );
};

module.exports = {
  getLongUrl,
};