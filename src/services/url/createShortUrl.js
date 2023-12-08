const urlModel = require("../../models/url/url.model");
const shortCode = require("../../utils/shortCode");
const generateQR = require("../../utils/generateQR");
const CONFIG = require("../../config");

const createShortUrl = async (longUrl, qrCode = false) => {
  if (!longUrl) {
    throw new Error("longUrl must be provided");
  }
  const shorted = shortCode();
  const shortUrl = new urlModel({
    shortCode: shorted,
    longUrl: longUrl,
    expiredAt: Date.now() + CONFIG.URL_EXPIRY,
  });
  const generatedUrl = `${CONFIG.DOMAIN}/${shortUrl.shortCode}`;
  await shortUrl.save();
  if (qrCode) {
    const qrCode = await generateQR(generatedUrl);
    return {
      shortUrl: generatedUrl,
      shortUrlQR: qrCode,
    };
  }
  return {
    shortUrl: generatedUrl,
  };
};

module.exports = {
  createShortUrl,
};