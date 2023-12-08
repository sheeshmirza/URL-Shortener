const urlFetcher = require("../../services/url/getLongUrl");
const utils = require("../../utils/utils");
const CONFIG = require("../../config");

const getLongUrl = async (request, response) => {
  try {
    const { shortCode } = request.params;
    utils.logger.log(
      "getLongUrl-controller",
      `shortCode -> ${shortCode}`
    );
    const { longUrl } = await urlFetcher.getLongUrl(shortCode);
    return response.status(302).redirect(longUrl);
  } catch (error) {
    utils.logger.error("getLongUrl-controller", error.message);
    return response.status(302).redirect(CONFIG.DOMAIN);
  }
};

module.exports = {
  getLongUrl,
};