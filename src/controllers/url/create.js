const urlCreator = require("../../services/url/createShortUrl");
const utils = require("../../utils/utils");

const createShortUrl = async (request, response) => {
  try {
    const { longUrl } = request.body;
    const { qrCode } = request.query;
    utils.logger.log(
      "createShortUrl-controller",
      `longUrl -> ${longUrl}, with qrCode -> ${qrCode}`
    );
    const shortUrl = await urlCreator.createShortUrl(longUrl, qrCode);
    utils.logger.log(
      "createShortUrl-controller",
      `created -> ${shortUrl.shortUrl}`
    );
    return response.status(201).json({
      success: true,
      message: "SUCCESS",
      shortUrl: shortUrl,
    });
  } catch (error) {
    utils.logger.error("createShortUrl-controller", error.message);
    return response.status(400).json({
      success: false,
      message: error.message,
      shortUrl: null,
    });
  }
};

module.exports = {
  createShortUrl,
};